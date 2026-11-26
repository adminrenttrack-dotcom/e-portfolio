import { NextResponse } from "next/server";
import { getSql } from "@/src/lib/db";

export const dynamic = "force-dynamic";

// Keep every Vercel serverless response safely under the 4.5 MB platform limit
const MAX_RANGE_BYTES = 2 * 1024 * 1024; // 2 MB per range response

async function getMediaLayout(id: string) {
  const sql = getSql();
  const [metaRows, sizeRows] = await Promise.all([
    sql`
      SELECT mime_type
      FROM eportfolio_media
      WHERE id = ${id}
      LIMIT 1
    `,
    sql`
      SELECT chunk_index, octet_length(data) AS byte_len
      FROM eportfolio_media_chunks
      WHERE media_id = ${id}
      ORDER BY chunk_index ASC
    `,
  ]);

  if (metaRows.length === 0 || sizeRows.length === 0) {
    return null;
  }

  const rawMime = String(metaRows[0].mime_type || "application/octet-stream");
  // Serving QuickTime (.mov) as video/mp4 enables native playback in Chrome/Edge as well as Safari
  const contentType = rawMime === "video/quicktime" ? "video/mp4" : rawMime;

  let offset = 0;
  const chunks = sizeRows.map((row) => {
    const length = Number(row.byte_len);
    const start = offset;
    const end = offset + length - 1;
    offset += length;
    return {
      chunkIndex: Number(row.chunk_index),
      start,
      end,
      length,
    };
  });

  return {
    contentType,
    totalLength: offset,
    chunks,
  };
}

export async function HEAD(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const layout = await getMediaLayout(id);
    if (!layout) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": layout.contentType,
        "Content-Length": String(layout.totalLength),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("HEAD /api/media/[id] error:", err);
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const layout = await getMediaLayout(id);
    if (!layout) {
      return new NextResponse("Not found", { status: 404 });
    }

    const { contentType, totalLength, chunks } = layout;
    const rangeHeader = request.headers.get("range");

    let start = 0;
    let end = totalLength - 1;
    let isPartial = false;

    if (rangeHeader) {
      const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      if (match) {
        isPartial = true;
        if (match[1] === "" && match[2] !== "") {
          // Suffix range: bytes=-500
          const suffixLen = Number.parseInt(match[2], 10);
          start = Math.max(0, totalLength - suffixLen);
          end = totalLength - 1;
        } else {
          start = match[1] ? Number.parseInt(match[1], 10) : 0;
          end = match[2]
            ? Math.min(Number.parseInt(match[2], 10), totalLength - 1)
            : totalLength - 1;
        }

        if (start >= totalLength || start > end) {
          return new NextResponse(null, {
            status: 416,
            headers: {
              "Content-Range": `bytes */${totalLength}`,
            },
          });
        }
      }
    }

    // Cap every response slice to MAX_RANGE_BYTES so large videos (10MB-100MB+)
    // stream cleanly through Vercel without hitting the 4.5 MB payload limit
    if (end - start + 1 > MAX_RANGE_BYTES) {
      end = start + MAX_RANGE_BYTES - 1;
      isPartial = true;
    }

    // Find ONLY the chunks that overlap [start, end]
    const needed = chunks.filter((c) => c.end >= start && c.start <= end);
    if (needed.length === 0) {
      return new NextResponse("Range not available", { status: 416 });
    }

    const minChunk = needed[0].chunkIndex;
    const maxChunk = needed[needed.length - 1].chunkIndex;

    const sql = getSql();
    const chunkRows = await sql`
      SELECT chunk_index, encode(data, 'base64') AS b64
      FROM eportfolio_media_chunks
      WHERE media_id = ${id}
        AND chunk_index >= ${minChunk}
        AND chunk_index <= ${maxChunk}
      ORDER BY chunk_index ASC
    `;

    const combined = Buffer.concat(
      chunkRows.map((row) => Buffer.from(String(row.b64), "base64"))
    );

    const sliceStart = start - needed[0].start;
    const sliceLen = end - start + 1;
    const slice = combined.subarray(sliceStart, sliceStart + sliceLen);

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Content-Length": String(slice.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    };

    if (isPartial) {
      headers["Content-Range"] = `bytes ${start}-${end}/${totalLength}`;
      return new NextResponse(new Uint8Array(slice), {
        status: 206,
        headers,
      });
    }

    return new NextResponse(new Uint8Array(slice), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("GET /api/media/[id] error:", err);
    return new NextResponse("Failed to stream media", { status: 500 });
  }
}
