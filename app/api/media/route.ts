import { NextResponse } from "next/server";
import { getSql } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();
    const [mediaRows, hiddenRows] = await Promise.all([
      sql`
        SELECT id, caption, category, date_label, description, media_type, mime_type, total_size, created_at
        FROM eportfolio_media
        ORDER BY created_at DESC
      `,
      sql`
        SELECT media_id FROM eportfolio_hidden_media
      `,
    ]);

    const items = mediaRows.map((row) => ({
      id: String(row.id),
      src: `/api/media/${encodeURIComponent(String(row.id))}`,
      caption: String(row.caption),
      category: String(row.category),
      date: String(row.date_label),
      description: String(row.description),
      mediaType: String(row.media_type) as "school" | "family" | "video",
      mimeType: String(row.mime_type),
    }));

    const hiddenIds = hiddenRows.map((r) => String(r.media_id));

    return NextResponse.json({ items, hiddenIds });
  } catch (err) {
    console.error("GET /api/media error:", err);
    return NextResponse.json(
      { error: "Failed to load media from Neon database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      id: string;
      caption: string;
      category: string;
      date: string;
      description: string;
      mediaType: "school" | "family" | "video";
      mimeType: string;
      totalSize: number;
      totalChunks: number;
    };

    if (!body.id || !body.caption || !body.mediaType || !body.mimeType) {
      return NextResponse.json(
        { error: "Missing required media fields." },
        { status: 400 }
      );
    }

    const sql = getSql();
    await sql`
      INSERT INTO eportfolio_media (
        id, caption, category, date_label, description, media_type, mime_type, total_size, total_chunks
      ) VALUES (
        ${body.id},
        ${body.caption},
        ${body.category},
        ${body.date},
        ${body.description},
        ${body.mediaType},
        ${body.mimeType},
        ${body.totalSize || 0},
        ${body.totalChunks || 1}
      )
      ON CONFLICT (id) DO NOTHING
    `;

    return NextResponse.json({
      ok: true,
      id: body.id,
      src: `/api/media/${encodeURIComponent(body.id)}`,
    });
  } catch (err) {
    console.error("POST /api/media error:", err);
    return NextResponse.json(
      { error: "Failed to save media metadata to Neon." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const isUserUpload = searchParams.get("isUserUpload") === "true";

    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const sql = getSql();
    if (isUserUpload) {
      await sql`DELETE FROM eportfolio_media WHERE id = ${id}`;
    } else {
      await sql`
        INSERT INTO eportfolio_hidden_media (media_id)
        VALUES (${id})
        ON CONFLICT (media_id) DO NOTHING
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/media error:", err);
    return NextResponse.json(
      { error: "Failed to delete media from Neon." },
      { status: 500 }
    );
  }
}
