export interface CloudMediaItem {
  id: string;
  src: string;
  caption: string;
  category: string;
  date: string;
  description: string;
  mediaType: "school" | "family" | "video";
  mimeType: string;
}

const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB per chunk (safe under Vercel's 4.5 MB limit)

export async function fetchCloudMedia(): Promise<{
  items: CloudMediaItem[];
  hiddenIds: string[];
}> {
  try {
    const res = await fetch("/api/media", { cache: "no-store" });
    if (!res.ok) return { items: [], hiddenIds: [] };
    const data = (await res.json()) as {
      items?: CloudMediaItem[];
      hiddenIds?: string[];
    };
    return {
      items: Array.isArray(data.items) ? data.items : [],
      hiddenIds: Array.isArray(data.hiddenIds) ? data.hiddenIds : [],
    };
  } catch {
    return { items: [], hiddenIds: [] };
  }
}

export async function uploadFileToNeon(params: {
  id: string;
  caption: string;
  category: string;
  date: string;
  description: string;
  mediaType: "school" | "family" | "video";
  file: File;
  onProgress?: (percent: number) => void;
}): Promise<CloudMediaItem> {
  const { id, caption, category, date, description, mediaType, file, onProgress } =
    params;

  const totalChunks = Math.max(1, Math.ceil(file.size / CHUNK_SIZE));
  const mimeType =
    file.type || (mediaType === "video" ? "video/mp4" : "image/jpeg");

  // 1. Register metadata row in Neon first
  const metaRes = await fetch("/api/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      caption,
      category,
      date,
      description,
      mediaType,
      mimeType,
      totalSize: file.size,
      totalChunks,
    }),
  });

  if (!metaRes.ok) {
    throw new Error("Failed to save media metadata to Neon.");
  }

  // 2. Upload binary chunks sequentially
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const slice = file.slice(start, end);

    const chunkRes = await fetch(
      `/api/media/chunk?mediaId=${encodeURIComponent(id)}&chunkIndex=${chunkIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: slice,
      }
    );

    if (!chunkRes.ok) {
      // Clean up partial metadata row if chunk upload fails
      await fetch(
        `/api/media?id=${encodeURIComponent(id)}&isUserUpload=true`,
        { method: "DELETE" }
      ).catch(() => {});
      throw new Error("Failed to upload media chunk to Neon.");
    }

    if (onProgress) {
      onProgress(Math.round(((chunkIndex + 1) / totalChunks) * 100));
    }
  }

  return {
    id,
    src: `/api/media/${encodeURIComponent(id)}`,
    caption,
    category,
    date,
    description,
    mediaType,
    mimeType,
  };
}

export async function deleteCloudMedia(
  id: string,
  isUserUpload: boolean
): Promise<void> {
  const res = await fetch(
    `/api/media?id=${encodeURIComponent(id)}&isUserUpload=${isUserUpload ? "true" : "false"}`,
    { method: "DELETE" }
  );
  if (!res.ok) {
    throw new Error("Failed to delete media from Neon.");
  }
}
