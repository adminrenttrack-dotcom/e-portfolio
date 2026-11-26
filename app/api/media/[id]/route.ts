import { NextResponse } from "next/server";
import { getSql } from "@/src/lib/db";

export const dynamic = "force-dynamic";

function toBuffer(val: unknown): Buffer {
  if (Buffer.isBuffer(val)) return val;
  if (val instanceof Uint8Array) return Buffer.from(val);
  if (typeof val === "string") {
    if (val.startsWith("\\x")) {
      return Buffer.from(val.slice(2), "hex");
    }
    return Buffer.from(val, "base64");
  }
  return Buffer.alloc(0);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sql = getSql();

    const metaRows = await sql`
      SELECT mime_type, total_size
      FROM eportfolio_media
      WHERE id = ${id}
      LIMIT 1
    `;

    if (metaRows.length === 0) {
      return new NextResponse("Not found", { status: 404 });
    }

    const mimeType = String(metaRows[0].mime_type || "application/octet-stream");

    const chunkRows = await sql`
      SELECT chunk_index, encode(data, 'base64') AS b64
      FROM eportfolio_media_chunks
      WHERE media_id = ${id}
      ORDER BY chunk_index ASC
    `;

    if (chunkRows.length === 0) {
      return new NextResponse("Media data missing", { status: 404 });
    }

    const buffers = chunkRows.map((row) =>
      Buffer.from(String(row.b64), "base64")
    );
    const fullBuffer = Buffer.concat(buffers);
    const totalLength = fullBuffer.length;

    const rangeHeader = request.headers.get("range");
    if (rangeHeader) {
      const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      if (match) {
        const start = match[1] ? Number.parseInt(match[1], 10) : 0;
        const end = match[2]
          ? Math.min(Number.parseInt(match[2], 10), totalLength - 1)
          : totalLength - 1;

        if (start >= totalLength || start > end) {
          return new NextResponse(null, {
            status: 416,
            headers: {
              "Content-Range": `bytes */${totalLength}`,
            },
          });
        }

        const slice = fullBuffer.subarray(start, end + 1);
        return new NextResponse(new Uint8Array(slice), {
          status: 206,
          headers: {
            "Content-Type": mimeType,
            "Content-Range": `bytes ${start}-${end}/${totalLength}`,
            "Accept-Ranges": "bytes",
            "Content-Length": String(slice.length),
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }

    return new NextResponse(new Uint8Array(fullBuffer), {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Accept-Ranges": "bytes",
        "Content-Length": String(totalLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("GET /api/media/[id] error:", err);
    return new NextResponse("Failed to stream media", { status: 500 });
  }
}

// Unused helper export guard
void toBuffer;
