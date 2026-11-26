"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Film,
  Heart,
  HeartHandshake,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  familyPhotos,
  familyStoryData,
  galleryCategories,
  galleryPhotos,
  galleryVideos,
  instructorFeedback,
  type FamilyPhoto,
  type GalleryCategory,
  type GalleryPhoto,
  type GalleryVideo,
} from "@/src/data/portfolioData";
import {
  deleteCloudMedia,
  fetchCloudMedia,
  uploadFileToNeon,
} from "@/src/lib/mediaStorage";
import { SectionHeader } from "./SectionHeader";
import { SmartImage } from "./SmartImage";

const pinColors = [
  "bg-[#FB7185]",
  "bg-[#FBBF24]",
  "bg-[#38BDF8]",
  "bg-[#1E4D3B]",
];

const photoUploadCategories = galleryCategories.filter(
  (c): c is Exclude<GalleryCategory, "All Photos"> => c !== "All Photos"
);

interface LightboxPhotoItem {
  id: string;
  src: string;
  caption: string;
  badge: string;
  description: string;
}

function VideoCardPlayer({ src, title }: { src: string; title: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1E4D3B] via-[#245A45] to-[#15382A] p-5 text-center text-[#FFFDF7] select-none">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBBF24] text-[#1E4D3B] shadow-md">
          <Film className="h-7 w-7" />
        </div>
        <p className="font-heading text-sm sm:text-base font-semibold leading-snug max-w-[26ch]">
          {title}
        </p>
        <span className="mt-2 inline-block rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-medium text-[#FFFDF7]/90">
          {src.startsWith("/api/") || src.startsWith("blob:")
            ? "Video format not supported by this browser (try MP4 / H.264)"
            : `Upload or drop video at public${src}`}
        </span>
      </div>
    );
  }

  return (
    <video
      key={src}
      src={src}
      controls
      playsInline
      preload="metadata"
      onError={() => setFailedSrc(src)}
      className="h-full w-full object-contain bg-[#10261D]"
    />
  );
}

export function GallerySection() {
  // 1. School & Classroom Photos state
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All Photos");
  const [userPhotos, setUserPhotos] = useState<GalleryPhoto[]>([]);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoCategory, setPhotoCategory] =
    useState<Exclude<GalleryCategory, "All Photos">>("Classroom Activities");
  const [photoCaption, setPhotoCaption] = useState("");
  const [selectedSchoolFiles, setSelectedSchoolFiles] = useState<File[]>([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoNotice, setPhotoNotice] = useState("");
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const photoScrollRef = useRef<HTMLDivElement | null>(null);

  // 2. Family Photos state (completely separate from School photos)
  const [userFamilyPhotos, setUserFamilyPhotos] = useState<FamilyPhoto[]>([]);
  const [familyModalOpen, setFamilyModalOpen] = useState(false);
  const [familyCaption, setFamilyCaption] = useState("");
  const [selectedFamilyFiles, setSelectedFamilyFiles] = useState<File[]>([]);
  const [isUploadingFamily, setIsUploadingFamily] = useState(false);
  const [familyNotice, setFamilyNotice] = useState("");
  const [storyExpanded, setStoryExpanded] = useState(false);
  const familyInputRef = useRef<HTMLInputElement | null>(null);
  const familyScrollRef = useRef<HTMLDivElement | null>(null);

  // 3. Videos state
  const [userVideos, setUserVideos] = useState<GalleryVideo[]>([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoTag, setVideoTag] = useState("Demonstration Teaching");
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoNotice, setVideoNotice] = useState("");
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const videoScrollRef = useRef<HTMLDivElement | null>(null);

  // 4. Delete confirmation modal state & persisted hidden IDs for pre-loaded items
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    title: string;
    type: "school" | "family" | "video";
    isUserUpload?: boolean;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Shared Lightbox state (supports opening either School or Family photos)
  const [lightboxItems, setLightboxItems] = useState<LightboxPhotoItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Load saved Neon cloud uploads (School Photos, Family Photos, Videos, Hidden IDs)
  useEffect(() => {
    let active = true;
    fetchCloudMedia().then(({ items, hiddenIds: savedHidden }) => {
      if (!active) return;
      const loadedSchool: GalleryPhoto[] = [];
      const loadedFamily: FamilyPhoto[] = [];
      const loadedVideos: GalleryVideo[] = [];

      items.forEach((rec) => {
        if (rec.mediaType === "video") {
          loadedVideos.push({
            id: rec.id,
            src: rec.src,
            title: rec.caption,
            tag: rec.category,
            date: rec.date,
            description: rec.description,
            isUserUpload: true,
          });
        } else if (rec.mediaType === "family") {
          loadedFamily.push({
            id: rec.id,
            src: rec.src,
            caption: rec.caption,
            date: rec.date,
            description: rec.description,
            objectPosition: "object-center",
            isUserUpload: true,
          });
        } else {
          const validCat = photoUploadCategories.includes(
            rec.category as Exclude<GalleryCategory, "All Photos">
          )
            ? (rec.category as Exclude<GalleryCategory, "All Photos">)
            : "Classroom Activities";
          loadedSchool.push({
            id: rec.id,
            src: rec.src,
            caption: rec.caption,
            category: validCat,
            date: rec.date,
            description: rec.description,
            objectPosition: "object-center",
            isUserUpload: true,
          });
        }
      });

      setUserPhotos(loadedSchool);
      setUserFamilyPhotos(loadedFamily);
      setUserVideos(loadedVideos);
      setHiddenIds(savedHidden);
    });

    return () => {
      active = false;
    };
  }, []);

  const allSchoolPhotos = [
    ...userPhotos,
    ...galleryPhotos.filter((p) => !hiddenIds.includes(p.id)),
  ];
  const filteredSchoolPhotos =
    activeCategory === "All Photos"
      ? allSchoolPhotos
      : allSchoolPhotos.filter((p) => p.category === activeCategory);

  const allFamilyPhotos = [
    ...userFamilyPhotos,
    ...familyPhotos.filter((p) => !hiddenIds.includes(p.id)),
  ];
  const allVideos = [
    ...userVideos,
    ...galleryVideos.filter((v) => !hiddenIds.includes(v.id)),
  ];

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
    const distance = Math.max(280, ref.current.clientWidth * 0.75);
    ref.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const openSchoolLightbox = (index: number) => {
    setLightboxItems(
      filteredSchoolPhotos.map((p) => ({
        id: p.id,
        src: p.src,
        caption: p.caption,
        badge: p.category,
        description: p.description,
      }))
    );
    setLightboxIndex(index);
  };

  const openFamilyLightbox = (index: number) => {
    setLightboxItems(
      allFamilyPhotos.map((p) => ({
        id: p.id,
        src: p.src,
        caption: p.caption,
        badge: "My Family",
        description: p.description,
      }))
    );
    setLightboxIndex(index);
  };

  const handleSchoolFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setSelectedSchoolFiles(valid);
    setPhotoNotice("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleUploadSchoolPhotos = async () => {
    if (selectedSchoolFiles.length === 0 || isUploadingPhoto) return;
    setIsUploadingPhoto(true);
    setUploadProgress(0);
    setPhotoNotice("");

    const added: GalleryPhoto[] = [];
    const todayLabel = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    try {
      for (let i = 0; i < selectedSchoolFiles.length; i++) {
        const file = selectedSchoolFiles[i];
        const id = `school-photo-${Date.now()}-${i}`;
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");
        const finalCaption = photoCaption.trim() || cleanName || "BEEd Photo";

        const saved = await uploadFileToNeon({
          id,
          caption: finalCaption,
          category: photoCategory,
          date: todayLabel,
          description: "Uploaded BEEd classroom evidence photo.",
          mediaType: "school",
          file,
          onProgress: (pct) => {
            const overall = Math.round(
              ((i + pct / 100) / selectedSchoolFiles.length) * 100
            );
            setUploadProgress(overall);
          },
        });

        added.push({
          id: saved.id,
          src: saved.src,
          caption: saved.caption,
          category: photoCategory,
          date: saved.date,
          description: saved.description,
          objectPosition: "object-center",
          isUserUpload: true,
        });
      }

      if (added.length > 0) {
        setUserPhotos((prev) => [...added, ...prev]);
        setPhotoCaption("");
        setSelectedSchoolFiles([]);
        setPhotoNotice(
          `Saved ${added.length} school ${added.length === 1 ? "photo" : "photos"} to cloud!`
        );
        setTimeout(() => {
          setPhotoNotice("");
          setPhotoModalOpen(false);
          photoScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        }, 750);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setPhotoNotice(`Error: ${msg}`);
    } finally {
      setIsUploadingPhoto(false);
      setUploadProgress(0);
    }
  };

  const handleFamilyFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setSelectedFamilyFiles(valid);
    setFamilyNotice("");
    if (familyInputRef.current) familyInputRef.current.value = "";
  };

  const handleUploadFamilyPhotos = async () => {
    if (selectedFamilyFiles.length === 0 || isUploadingFamily) return;
    setIsUploadingFamily(true);
    setUploadProgress(0);
    setFamilyNotice("");

    const added: FamilyPhoto[] = [];
    const todayLabel = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    try {
      for (let i = 0; i < selectedFamilyFiles.length; i++) {
        const file = selectedFamilyFiles[i];
        const id = `family-photo-${Date.now()}-${i}`;
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");
        const finalCaption =
          familyCaption.trim() || cleanName || "My Family Keepsake";

        const saved = await uploadFileToNeon({
          id,
          caption: finalCaption,
          category: "Family",
          date: todayLabel,
          description: "Cherished family moment and inspiration.",
          mediaType: "family",
          file,
          onProgress: (pct) => {
            const overall = Math.round(
              ((i + pct / 100) / selectedFamilyFiles.length) * 100
            );
            setUploadProgress(overall);
          },
        });

        added.push({
          id: saved.id,
          src: saved.src,
          caption: saved.caption,
          date: saved.date,
          description: saved.description,
          objectPosition: "object-center",
          isUserUpload: true,
        });
      }

      if (added.length > 0) {
        setUserFamilyPhotos((prev) => [...added, ...prev]);
        setFamilyCaption("");
        setSelectedFamilyFiles([]);
        setFamilyNotice(
          `Saved ${added.length} family ${added.length === 1 ? "photo" : "photos"} to cloud!`
        );
        setTimeout(() => {
          setFamilyNotice("");
          setFamilyModalOpen(false);
          familyScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        }, 750);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setFamilyNotice(`Error: ${msg}`);
    } finally {
      setIsUploadingFamily(false);
      setUploadProgress(0);
    }
  };

  const handleVideoFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("video/"));
    setSelectedVideoFiles(valid);
    setVideoNotice("");
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleUploadVideos = async () => {
    if (selectedVideoFiles.length === 0 || isUploadingVideo) return;
    setIsUploadingVideo(true);
    setUploadProgress(0);
    setVideoNotice("");

    const added: GalleryVideo[] = [];
    const todayLabel = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    try {
      for (let i = 0; i < selectedVideoFiles.length; i++) {
        const file = selectedVideoFiles[i];
        const id = `video-upload-${Date.now()}-${i}`;
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");
        const finalTitle =
          videoTitle.trim() || cleanName || "BEEd Teaching Video";

        const saved = await uploadFileToNeon({
          id,
          caption: finalTitle,
          category: videoTag,
          date: todayLabel,
          description: "Uploaded BEEd teaching / classroom activity video.",
          mediaType: "video",
          file,
          onProgress: (pct) => {
            const overall = Math.round(
              ((i + pct / 100) / selectedVideoFiles.length) * 100
            );
            setUploadProgress(overall);
          },
        });

        added.push({
          id: saved.id,
          src: saved.src,
          title: saved.caption,
          tag: saved.category,
          date: saved.date,
          description: saved.description,
          isUserUpload: true,
        });
      }

      if (added.length > 0) {
        setUserVideos((prev) => [...added, ...prev]);
        setVideoTitle("");
        setSelectedVideoFiles([]);
        setVideoNotice(
          `Saved ${added.length} ${added.length === 1 ? "video" : "videos"} to cloud! Visible on all devices.`
        );
        setTimeout(() => {
          setVideoNotice("");
          setVideoModalOpen(false);
          videoScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        }, 850);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setVideoNotice(`Error: ${msg}`);
    } finally {
      setIsUploadingVideo(false);
      setUploadProgress(0);
    }
  };

  const requestDelete = (
    e: React.MouseEvent | null,
    id: string,
    title: string,
    type: "school" | "family" | "video",
    isUserUpload?: boolean
  ) => {
    if (e) e.stopPropagation();
    setPendingDelete({ id, title, type, isUserUpload });
  };

  const confirmDelete = async () => {
    if (!pendingDelete || isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteCloudMedia(pendingDelete.id, Boolean(pendingDelete.isUserUpload));

      if (pendingDelete.isUserUpload) {
        if (pendingDelete.type === "school") {
          setUserPhotos((prev) =>
            prev.filter((item) => item.id !== pendingDelete.id)
          );
        } else if (pendingDelete.type === "family") {
          setUserFamilyPhotos((prev) =>
            prev.filter((item) => item.id !== pendingDelete.id)
          );
        } else {
          setUserVideos((prev) =>
            prev.filter((item) => item.id !== pendingDelete.id)
          );
        }
      } else {
        setHiddenIds((prev) =>
          prev.includes(pendingDelete.id) ? prev : [...prev, pendingDelete.id]
        );
      }

      if (pendingDelete.type !== "video") {
        setLightboxIndex(null);
      }
    } finally {
      setIsDeleting(false);
      setPendingDelete(null);
    }
  };

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null || lightboxItems.length === 0
        ? null
        : (prev + 1) % lightboxItems.length
    );
  }, [lightboxItems.length]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null || lightboxItems.length === 0
        ? null
        : (prev - 1 + lightboxItems.length) % lightboxItems.length
    );
  }, [lightboxItems.length]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -55 || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > 55 || info.velocity.x > 300) {
      handlePrev();
    }
  };

  useEffect(() => {
    const anyModalOpen =
      lightboxIndex !== null ||
      photoModalOpen ||
      familyModalOpen ||
      videoModalOpen ||
      pendingDelete !== null;
    if (!anyModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setPhotoModalOpen(false);
        setFamilyModalOpen(false);
        setVideoModalOpen(false);
        setPendingDelete(null);
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [
    lightboxIndex,
    photoModalOpen,
    familyModalOpen,
    videoModalOpen,
    pendingDelete,
    handleNext,
    handlePrev,
  ]);

  const activeLightboxPhoto =
    lightboxIndex !== null ? lightboxItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <SectionHeader
        number="02"
        eyebrow="School Photos, Family Keepsakes & Videos"
        title="Evidence of Learning & Gallery"
        subtitle="School photos, family inspiration photos, and BEEd teaching videos are separated into their own scrollable shelves below."
        accent="blue"
      />

      {/* ======================================================= */}
      {/* PART A: SCHOOL & CLASSROOM PHOTO GALLERY                */}
      {/* ======================================================= */}
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#38BDF8]/20 text-[#0369A1]">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]">
                School &amp; Classroom Photos
              </h3>
              <p className="text-xs sm:text-sm text-[#1C2420]/65">
                {filteredSchoolPhotos.length}{" "}
                {filteredSchoolPhotos.length === 1 ? "photo" : "photos"} •
                Scroll sideways or tap to zoom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => scrollTrack(photoScrollRef, "left")}
                aria-label="Scroll school photos left"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(photoScrollRef, "right")}
                aria-label="Scroll school photos right"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#1E4D3B] px-4 py-2 font-heading text-sm font-semibold text-[#FFFDF7] shadow-sm transition-colors hover:bg-[#15382A] active:scale-95"
            >
              <Plus className="h-4 w-4 text-[#FBBF24]" />
              Upload School Photos
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable School Photo Category Pills */}
        <div className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Filter school photos"
            className="w-full overflow-x-auto no-scrollbar touch-pan-x scroll-smooth pb-2"
          >
            <div className="flex w-max flex-nowrap items-center gap-2">
              {galleryCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(category);
                      setLightboxIndex(null);
                      photoScrollRef.current?.scrollTo({
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    className={`shrink-0 whitespace-nowrap min-h-[40px] rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "bg-[#1E4D3B] text-[#FFFDF7] shadow-sm"
                        : "border border-[#1E4D3B]/15 bg-white text-[#1E4D3B]/80 hover:bg-[#1E4D3B]/5"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable School Photo Shelf */}
        <div
          ref={photoScrollRef}
          className="-mx-4 px-4 sm:mx-0 sm:px-1 overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth pt-4 pb-5"
        >
          <div className="flex w-max items-stretch gap-6">
            {filteredSchoolPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                role="button"
                tabIndex={0}
                onClick={() => openSchoolLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openSchoolLightbox(idx);
                  }
                }}
                className="group relative w-[80vw] max-w-[300px] sm:w-[305px] shrink-0 snap-start cursor-pointer text-left rounded-xl bg-white p-3.5 pb-5 shadow-[0_12px_28px_rgba(30,77,59,0.12)] border border-[#1E4D3B]/12 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(30,77,59,0.18)] focus:outline-none focus:ring-2 focus:ring-[#1E4D3B]"
              >
                <div
                  aria-hidden="true"
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full ${
                    pinColors[idx % pinColors.length]
                  } shadow-md ring-2 ring-white`}
                />

                <button
                  type="button"
                  onClick={(e) =>
                    requestDelete(
                      e,
                      photo.id,
                      photo.caption,
                      "school",
                      photo.isUserUpload
                    )
                  }
                  aria-label="Delete school photo"
                  className="absolute top-2 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FB7185] text-white shadow-md transition-colors hover:bg-[#E11D48] active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#FFFDF7]">
                  <SmartImage
                    src={photo.src}
                    alt={photo.caption}
                    fallbackLabel={photo.caption}
                    className={`h-full w-full object-cover ${
                      photo.objectPosition || "object-center"
                    } transition-transform duration-300 group-hover:scale-105`}
                  />
                  <span className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E4D3B]/80 text-white opacity-90 sm:opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-3.5 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-md bg-[#38BDF8]/18 px-2 py-0.5 text-[11px] font-bold text-[#0369A1]">
                      {photo.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#1C2420]/55">
                      {photo.date}
                    </span>
                  </div>
                  <p className="mt-2 font-hand text-xl sm:text-2xl font-bold leading-snug text-[#1E4D3B] line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* PART B: SEPARATE FAMILY STORY & FAMILY PHOTO GALLERY    */}
      {/* ======================================================= */}
      <div className="mt-14 pt-12 border-t-2 border-dashed border-[#1E4D3B]/18">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FB7185]/20 text-[#BE123C]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]">
                {familyStoryData.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#1C2420]/65">
                Family photos &amp; personal dedication • Separate from school
                photos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => scrollTrack(familyScrollRef, "left")}
                aria-label="Scroll family photos left"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(familyScrollRef, "right")}
                aria-label="Scroll family photos right"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFamilyModalOpen(true)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FB7185] px-4 py-2 font-heading text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#E11D48] active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Upload Family Photos
            </button>
          </div>
        </div>

        {/* Romnick's Family Tribute Essay */}
        <div className="mb-7 rounded-3xl border-2 border-[#FB7185]/30 bg-white/95 p-5 sm:p-7 shadow-[0_10px_26px_rgba(30,77,59,0.07)]">
          <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#1C2420]/85">
            {(storyExpanded
              ? familyStoryData.paragraphs
              : familyStoryData.paragraphs.slice(0, 3)
            ).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {storyExpanded && (
            <p className="mt-4 font-hand text-2xl font-bold text-[#1E4D3B]">
              {familyStoryData.closing}
            </p>
          )}

          <button
            type="button"
            onClick={() => setStoryExpanded((prev) => !prev)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#FB7185]/15 px-3.5 py-2 text-xs sm:text-sm font-bold text-[#BE123C] transition-colors hover:bg-[#FB7185]/25"
          >
            {storyExpanded
              ? "Show Less"
              : "Read Full Family Tribute (" +
                familyStoryData.closing +
                ")"}
          </button>
        </div>

        {/* Horizontal Scrollable Family Photo Shelf */}
        <div
          ref={familyScrollRef}
          className="-mx-4 px-4 sm:mx-0 sm:px-1 overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth pt-3 pb-4"
        >
          <div className="flex w-max items-stretch gap-6">
            {allFamilyPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                role="button"
                tabIndex={0}
                onClick={() => openFamilyLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFamilyLightbox(idx);
                  }
                }}
                className="group relative w-[80vw] max-w-[300px] sm:w-[305px] shrink-0 snap-start cursor-pointer text-left rounded-xl bg-white p-3.5 pb-5 shadow-[0_12px_28px_rgba(251,113,133,0.14)] border border-[#FB7185]/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(251,113,133,0.22)] focus:outline-none focus:ring-2 focus:ring-[#FB7185]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[#FB7185] shadow-md ring-2 ring-white"
                />

                <button
                  type="button"
                  onClick={(e) =>
                    requestDelete(
                      e,
                      photo.id,
                      photo.caption,
                      "family",
                      photo.isUserUpload
                    )
                  }
                  aria-label="Delete family photo"
                  className="absolute top-2 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FB7185] text-white shadow-md transition-colors hover:bg-[#E11D48] active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#FFFDF7]">
                  <SmartImage
                    src={photo.src}
                    alt={photo.caption}
                    fallbackLabel={photo.caption}
                    className={`h-full w-full object-cover ${
                      photo.objectPosition || "object-center"
                    } transition-transform duration-300 group-hover:scale-105`}
                  />
                  <span className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#BE123C]/80 text-white opacity-90 sm:opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-3.5 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#FB7185]/18 px-2 py-0.5 text-[11px] font-bold text-[#BE123C]">
                      <Heart className="h-3 w-3" />
                      My Family
                    </span>
                    <span className="text-[11px] font-medium text-[#1C2420]/55">
                      {photo.date}
                    </span>
                  </div>
                  <p className="mt-2 font-hand text-xl sm:text-2xl font-bold leading-snug text-[#1E4D3B] line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* PART C: SCROLLABLE BEEd TEACHING & CLASSROOM VIDEOS     */}
      {/* ======================================================= */}
      <div className="mt-14 pt-12 border-t-2 border-dashed border-[#1E4D3B]/18">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBF24]/30 text-[#92400E]">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1E4D3B]">
                BEEd Teaching &amp; Classroom Videos
              </h3>
              <p className="text-xs sm:text-sm text-[#1C2420]/65">
                {allVideos.length} {allVideos.length === 1 ? "video" : "videos"}{" "}
                • Upload MP4/MOV clips and play directly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={() => scrollTrack(videoScrollRef, "left")}
                aria-label="Scroll videos left"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(videoScrollRef, "right")}
                aria-label="Scroll videos right"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E4D3B]/15 bg-white text-[#1E4D3B] hover:bg-[#1E4D3B]/5 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FBBF24] px-4 py-2 font-heading text-sm font-bold text-[#1C2420] shadow-sm transition-colors hover:bg-[#F59E0B] active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Upload Videos
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Video Shelf (or clean empty state) */}
        {allVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#1E4D3B]/20 bg-white/80 px-6 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBBF24]/25 text-[#92400E]">
              <Film className="h-6 w-6" />
            </div>
            <p className="font-heading text-base sm:text-lg font-bold text-[#1E4D3B]">
              No videos uploaded yet
            </p>
            <p className="mt-1 max-w-md text-xs sm:text-sm text-[#1C2420]/65">
              Tap &ldquo;Upload Videos&rdquo; above to add BEEd demonstration
              teaching or classroom activity video clips.
            </p>
          </div>
        ) : (
          <div
            ref={videoScrollRef}
            className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-smooth pb-4"
          >
            <div className="flex w-max items-stretch gap-5">
              {allVideos.map((video) => (
                <article
                  key={video.id}
                  className="relative w-[86vw] max-w-[420px] sm:w-[440px] shrink-0 snap-start overflow-hidden rounded-3xl border-2 border-[#1E4D3B]/15 bg-white shadow-[0_10px_28px_rgba(30,77,59,0.09)]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      requestDelete(
                        null,
                        video.id,
                        video.title,
                        "video",
                        video.isUserUpload
                      )
                    }
                    aria-label="Delete video"
                    className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#FB7185] text-white shadow-md transition-colors hover:bg-[#E11D48] active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="aspect-video w-full overflow-hidden bg-[#10261D]">
                    <VideoCardPlayer src={video.src} title={video.title} />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#FBBF24]/25 px-2.5 py-0.5 text-xs font-bold text-[#92400E]">
                        <Film className="h-3.5 w-3.5" />
                        {video.tag}
                      </span>
                      <span className="text-xs font-medium text-[#1C2420]/55">
                        {video.date}
                      </span>
                    </div>
                    <h4 className="mt-2 font-heading text-lg font-bold text-[#1E4D3B] line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#1C2420]/75 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Handwritten-Style Instructor Feedback Card with Instructor Photo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="mt-14"
      >
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#FB7185]/40 bg-[#FFFDF7]/95 p-6 sm:p-8 shadow-[0_14px_34px_rgba(30,77,59,0.09)]">
          <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-[#FBBF24]/30 to-transparent" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="mx-auto md:mx-0 w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-2.5 pb-4 shadow-[0_10px_24px_rgba(30,77,59,0.14)] border border-[#1E4D3B]/12">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#1E4D3B]/5">
                <SmartImage
                  src={instructorFeedback.instructorImage}
                  alt={`Portrait of ${instructorFeedback.instructorName}`}
                  fallbackLabel={instructorFeedback.instructorName}
                  variant="portrait"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="mt-2.5 text-center font-hand text-lg font-bold leading-tight text-[#1E4D3B]">
                {instructorFeedback.instructorName}
              </p>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FB7185]/15 px-3 py-1 text-xs font-bold text-[#BE123C]">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Instructor Appreciation &amp; Feedback
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C2420]/60">
                  <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" />
                  {instructorFeedback.date}
                </span>
              </div>

              <p className="mt-4 font-hand text-2xl sm:text-3xl leading-relaxed text-[#1E4D3B]">
                &ldquo;{instructorFeedback.note}&rdquo;
              </p>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-dashed border-[#1E4D3B]/15 pt-4">
                <div>
                  <p className="font-heading text-base sm:text-lg font-bold text-[#1E4D3B]">
                    — {instructorFeedback.instructorName}
                  </p>
                  <p className="text-xs font-medium text-[#1C2420]/65">
                    {instructorFeedback.role}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {instructorFeedback.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-xl bg-[#1E4D3B]/8 px-3 py-1 text-xs font-semibold text-[#1E4D3B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======================================================= */}
      {/* MODAL 1: UPLOAD SCHOOL PHOTOS                           */}
      {/* ======================================================= */}
      <AnimatePresence>
        {photoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhotoModalOpen(false)}
              className="fixed inset-0 bg-[#15382A]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload-school-photo-title"
              className="relative z-10 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border-2 border-[#1E4D3B]/20 bg-[#FFFDF7] p-6 sm:p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#38BDF8]/20 text-[#0369A1]">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      id="upload-school-photo-title"
                      className="font-heading text-xl font-bold text-[#1E4D3B]"
                    >
                      Upload School Photos
                    </h3>
                    <p className="text-xs text-[#1C2420]/65">
                      Add classroom, demo teaching, or output photos
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  aria-label="Close school photo upload modal"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E4D3B]/10 text-[#1E4D3B] hover:bg-[#1E4D3B]/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-photo-category"
                    className="block text-xs font-bold text-[#1E4D3B] mb-1.5"
                  >
                    Category
                  </label>
                  <select
                    id="modal-photo-category"
                    value={photoCategory}
                    onChange={(e) =>
                      setPhotoCategory(
                        e.target.value as Exclude<GalleryCategory, "All Photos">
                      )
                    }
                    className="w-full min-h-[46px] rounded-xl border border-[#1E4D3B]/20 bg-white px-3.5 text-sm text-[#1C2420] focus:border-[#1E4D3B] focus:outline-none"
                  >
                    {photoUploadCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-photo-caption"
                    className="block text-xs font-bold text-[#1E4D3B] mb-1.5"
                  >
                    Caption (Optional)
                  </label>
                  <input
                    id="modal-photo-caption"
                    type="text"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="e.g., BEEd 2C Instructional Materials"
                    className="w-full min-h-[46px] rounded-xl border border-[#1E4D3B]/20 bg-white px-3.5 text-sm text-[#1C2420] focus:border-[#1E4D3B] focus:outline-none"
                  />
                </div>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSchoolFilesPicked}
                  className="hidden"
                />

                <button
                  type="button"
                  disabled={isUploadingPhoto}
                  onClick={() => photoInputRef.current?.click()}
                  className="flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#38BDF8] bg-[#38BDF8]/12 px-5 py-3 font-heading text-sm sm:text-base font-bold text-[#075985] transition-colors hover:bg-[#38BDF8]/22 disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                  {selectedSchoolFiles.length > 0
                    ? `Change Files (${selectedSchoolFiles.length} selected)`
                    : "Choose School Photos"}
                </button>

                {selectedSchoolFiles.length > 0 && (
                  <div className="rounded-xl border border-[#1E4D3B]/15 bg-white px-3.5 py-2.5 text-xs text-[#1C2420]/80">
                    <p className="font-bold text-[#1E4D3B] mb-1">
                      Ready to upload ({selectedSchoolFiles.length}):
                    </p>
                    <p className="truncate">
                      {selectedSchoolFiles.map((f) => f.name).join(", ")}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  disabled={selectedSchoolFiles.length === 0 || isUploadingPhoto}
                  onClick={handleUploadSchoolPhotos}
                  className="flex w-full min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#1E4D3B] px-5 py-3 font-heading text-sm sm:text-base font-bold text-[#FFFDF7] shadow-sm transition-colors hover:bg-[#15382A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-[#FBBF24]" />
                      Uploading Photos ({uploadProgress}%)...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 text-[#FBBF24]" />
                      Upload &amp; Save Photos
                    </>
                  )}
                </button>

                {photoNotice && (
                  <p
                    className={`text-center text-sm font-bold ${
                      photoNotice.startsWith("Error:")
                        ? "text-[#BE123C]"
                        : "text-[#1E4D3B]"
                    }`}
                  >
                    {photoNotice.startsWith("Error:") ? photoNotice : `✓ ${photoNotice}`}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 2: UPLOAD FAMILY PHOTOS                           */}
      {/* ======================================================= */}
      <AnimatePresence>
        {familyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFamilyModalOpen(false)}
              className="fixed inset-0 bg-[#15382A]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload-family-photo-title"
              className="relative z-10 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border-2 border-[#FB7185]/30 bg-[#FFFDF7] p-6 sm:p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FB7185]/20 text-[#BE123C]">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      id="upload-family-photo-title"
                      className="font-heading text-xl font-bold text-[#1E4D3B]"
                    >
                      Upload Family Photos
                    </h3>
                    <p className="text-xs text-[#1C2420]/65">
                      Add cherished family memories to your Family Album
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFamilyModalOpen(false)}
                  aria-label="Close family photo upload modal"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E4D3B]/10 text-[#1E4D3B] hover:bg-[#1E4D3B]/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-family-caption"
                    className="block text-xs font-bold text-[#1E4D3B] mb-1.5"
                  >
                    Caption (Optional)
                  </label>
                  <input
                    id="modal-family-caption"
                    type="text"
                    value={familyCaption}
                    onChange={(e) => setFamilyCaption(e.target.value)}
                    placeholder="e.g., My Family — My Greatest Inspiration"
                    className="w-full min-h-[46px] rounded-xl border border-[#1E4D3B]/20 bg-white px-3.5 text-sm text-[#1C2420] focus:border-[#FB7185] focus:outline-none"
                  />
                </div>

                <input
                  ref={familyInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFamilyFilesPicked}
                  className="hidden"
                />

                <button
                  type="button"
                  disabled={isUploadingFamily}
                  onClick={() => familyInputRef.current?.click()}
                  className="flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#FB7185] bg-[#FB7185]/12 px-5 py-3 font-heading text-sm sm:text-base font-bold text-[#BE123C] transition-colors hover:bg-[#FB7185]/22 disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                  {selectedFamilyFiles.length > 0
                    ? `Change Files (${selectedFamilyFiles.length} selected)`
                    : "Choose Family Photos"}
                </button>

                {selectedFamilyFiles.length > 0 && (
                  <div className="rounded-xl border border-[#FB7185]/25 bg-white px-3.5 py-2.5 text-xs text-[#1C2420]/80">
                    <p className="font-bold text-[#BE123C] mb-1">
                      Ready to upload ({selectedFamilyFiles.length}):
                    </p>
                    <p className="truncate">
                      {selectedFamilyFiles.map((f) => f.name).join(", ")}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  disabled={
                    selectedFamilyFiles.length === 0 || isUploadingFamily
                  }
                  onClick={handleUploadFamilyPhotos}
                  className="flex w-full min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#FB7185] px-5 py-3 font-heading text-sm sm:text-base font-bold text-white shadow-sm transition-colors hover:bg-[#E11D48] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploadingFamily ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading Family Photos ({uploadProgress}%)...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Upload &amp; Save Family Photos
                    </>
                  )}
                </button>

                {familyNotice && (
                  <p
                    className={`text-center text-sm font-bold ${
                      familyNotice.startsWith("Error:")
                        ? "text-[#BE123C]"
                        : "text-[#1E4D3B]"
                    }`}
                  >
                    {familyNotice.startsWith("Error:") ? familyNotice : `✓ ${familyNotice}`}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 3: UPLOAD VIDEOS                                  */}
      {/* ======================================================= */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="fixed inset-0 bg-[#15382A]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="upload-video-modal-title"
              className="relative z-10 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border-2 border-[#1E4D3B]/20 bg-[#FFFDF7] p-6 sm:p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBBF24]/30 text-[#92400E]">
                    <Film className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      id="upload-video-modal-title"
                      className="font-heading text-xl font-bold text-[#1E4D3B]"
                    >
                      Upload BEEd Videos
                    </h3>
                    <p className="text-xs text-[#1C2420]/65">
                      Select MP4 or MOV clips — plays directly on the page
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  aria-label="Close video upload modal"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E4D3B]/10 text-[#1E4D3B] hover:bg-[#1E4D3B]/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-video-tag"
                    className="block text-xs font-bold text-[#1E4D3B] mb-1.5"
                  >
                    Video Label
                  </label>
                  <select
                    id="modal-video-tag"
                    value={videoTag}
                    onChange={(e) => setVideoTag(e.target.value)}
                    className="w-full min-h-[46px] rounded-xl border border-[#1E4D3B]/20 bg-white px-3.5 text-sm text-[#1C2420] focus:border-[#1E4D3B] focus:outline-none"
                  >
                    <option value="Demonstration Teaching">
                      Demonstration Teaching
                    </option>
                    <option value="Classroom Activity">
                      Classroom Activity
                    </option>
                    <option value="Micro-Teaching">Micro-Teaching</option>
                    <option value="Performance Task">Performance Task</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="modal-video-title"
                    className="block text-xs font-bold text-[#1E4D3B] mb-1.5"
                  >
                    Video Title (Optional)
                  </label>
                  <input
                    id="modal-video-title"
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g., Grade 3 Reading Demo Teaching"
                    className="w-full min-h-[46px] rounded-xl border border-[#1E4D3B]/20 bg-white px-3.5 text-sm text-[#1C2420] focus:border-[#1E4D3B] focus:outline-none"
                  />
                </div>

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoFilesPicked}
                  className="hidden"
                />

                <button
                  type="button"
                  disabled={isUploadingVideo}
                  onClick={() => videoInputRef.current?.click()}
                  className="flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#FBBF24] bg-[#FBBF24]/18 px-5 py-3 font-heading text-sm sm:text-base font-bold text-[#78350F] transition-colors hover:bg-[#FBBF24]/30 disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                  {selectedVideoFiles.length > 0
                    ? `Change Videos (${selectedVideoFiles.length} selected)`
                    : "Choose Videos from Device"}
                </button>

                {selectedVideoFiles.length > 0 && (
                  <div className="rounded-xl border border-[#FBBF24]/45 bg-white px-3.5 py-2.5 text-xs text-[#1C2420]/80">
                    <p className="font-bold text-[#92400E] mb-1">
                      Ready to upload ({selectedVideoFiles.length}):
                    </p>
                    <p className="truncate">
                      {selectedVideoFiles.map((f) => f.name).join(", ")}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  disabled={selectedVideoFiles.length === 0 || isUploadingVideo}
                  onClick={handleUploadVideos}
                  className="flex w-full min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#FBBF24] px-5 py-3 font-heading text-sm sm:text-base font-bold text-[#1C2420] shadow-sm transition-colors hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploadingVideo ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading Video ({uploadProgress}%)...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Upload &amp; Save Videos
                    </>
                  )}
                </button>

                {videoNotice && (
                  <p
                    className={`text-center text-sm font-bold ${
                      videoNotice.startsWith("Error:")
                        ? "text-[#BE123C]"
                        : "text-[#1E4D3B]"
                    }`}
                  >
                    {videoNotice.startsWith("Error:") ? videoNotice : `✓ ${videoNotice}`}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* DELETE CONFIRMATION MODAL                               */}
      {/* ======================================================= */}
      <AnimatePresence>
        {pendingDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setPendingDelete(null)}
              className="fixed inset-0 bg-[#15382A]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-confirm-title"
              className="relative z-10 w-full max-w-sm rounded-3xl border-2 border-[#FB7185]/35 bg-[#FFFDF7] p-6 shadow-2xl"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FB7185]/20 text-[#BE123C]">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    id="delete-confirm-title"
                    className="font-heading text-lg font-bold text-[#1E4D3B]"
                  >
                    Delete this{" "}
                    {pendingDelete.type === "video" ? "video" : "photo"}?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#1C2420]/75 leading-relaxed">
                    Are you sure you want to remove{" "}
                    <strong className="text-[#1E4D3B]">
                      &ldquo;{pendingDelete.title}&rdquo;
                    </strong>
                    ? This cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setPendingDelete(null)}
                  className="min-h-[44px] rounded-xl border border-[#1E4D3B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#1E4D3B] hover:bg-[#1E4D3B]/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#E11D48] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#BE123C] disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* FULL-SCREEN TOUCH-SWIPE PHOTO LIGHTBOX MODAL            */}
      {/* ======================================================= */}
      <AnimatePresence>
        {activeLightboxPhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxPhoto.caption}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#10261D]/95 p-3 sm:p-6 backdrop-blur-md"
          >
            <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="rounded-full bg-[#FBBF24] px-3 py-1 text-xs font-bold text-[#1C2420] shrink-0">
                  {lightboxIndex + 1} / {lightboxItems.length}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white truncate">
                  {activeLightboxPhoto.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full bg-white/15 text-white active:scale-95 hover:bg-white/25"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mx-auto my-3 flex w-full max-w-4xl flex-1 items-center justify-center overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                className="hidden sm:flex min-h-[48px] min-w-[48px] mr-4 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.div
                key={activeLightboxPhoto.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="w-full max-w-2xl cursor-grab active:cursor-grabbing rounded-2xl bg-white p-3 sm:p-4 shadow-2xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#10261D]">
                  <SmartImage
                    src={activeLightboxPhoto.src}
                    alt={activeLightboxPhoto.caption}
                    fallbackLabel={activeLightboxPhoto.caption}
                    className="h-full w-full object-contain pointer-events-none select-none"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="font-hand text-2xl sm:text-3xl font-bold text-[#1E4D3B] leading-tight">
                    {activeLightboxPhoto.caption}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#1C2420]/75">
                    {activeLightboxPhoto.description}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                className="hidden sm:flex min-h-[48px] min-w-[48px] ml-4 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 pb-1">
              <button
                type="button"
                onClick={handlePrev}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white/15 px-4 text-sm font-semibold text-white active:scale-95 hover:bg-white/25"
              >
                <ChevronLeft className="h-5 w-5" />
                Prev
              </button>
              <span className="text-[11px] font-medium text-white/65 text-center shrink-0">
                Swipe photo
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#FBBF24] px-4 text-sm font-bold text-[#1C2420] active:scale-95 hover:bg-[#F59E0B]"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
