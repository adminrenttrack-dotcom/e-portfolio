import { NextResponse } from "next/server";
import { getSql } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get("mediaId");
    const chunkIndexStr = searchParams.get("chunkIndex");

    if (!mediaId || chunkIndexStr === null) {
      return NextResponse.json(
        { error: "Missing mediaId or chunkIndex." },
        { status: 400 }
      );
    }

    const chunkIndex = Number.parseInt(chunkIndexStr, 10);
    if (Number.isNaN(chunkIndex) || chunkIndex < 0) {
      return NextResponse.json(
        { error: "Invalid chunkIndex." },
        { status: 400 }
      );
    }

    const arrayBuffer = await request.arrayBuffer();
    const hexData = "\\x" + Buffer.from(arrayBuffer).toString("hex");

    const sql = getSql();
    await sql`
      INSERT INTO eportfolio_media_chunks (media_id, chunk_index, data)
      VALUES (${mediaId}, ${chunkIndex}, ${hexData}::bytea)
      ON CONFLICT (media_id, chunk_index) DO UPDATE SET data = EXCLUDED.data
    `;

    return NextResponse.json({ ok: true, chunkIndex });
  } catch (err) {
    console.error("POST /api/media/chunk error:", err);
    return NextResponse.json(
      { error: "Failed to upload media chunk to Neon." },
      { status: 500 }
    );
  }
}
