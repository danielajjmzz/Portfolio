import { Play } from "lucide-react";
import type { TeachingMedia } from "@/data/teaching";
import { cn } from "@/lib/utils";

/**
 * Shows a photo or a silent looping video. While `media.src` is empty it shows a dashed,
 * labeled placeholder (matching the wireframes) so layouts can be reviewed before content lands.
 */
export function MediaFrame({
  media,
  className,
  rounded = "rounded-frame",
  eager = false,
}: {
  media: TeachingMedia;
  /** Sizing / aspect classes, e.g. "aspect-[16/9]". */
  className?: string;
  rounded?: string;
  eager?: boolean;
}) {
  if (!media.src) {
    return (
      <div
        role="img"
        aria-label={`Placeholder: ${media.label}`}
        className={cn("placeholder-frame flex-col gap-1.5 px-4 text-center", rounded, className)}
      >
        {media.type === "video" && (
          <span className="mb-1 flex size-9 items-center justify-center rounded-full border border-link text-link">
            <Play aria-hidden className="size-4" />
          </span>
        )}
        <span className="font-semibold text-link">{media.label}</span>
        {media.note && (
          <span className="text-[0.625rem] normal-case tracking-normal text-link">
            {media.note}
          </span>
        )}
      </div>
    );
  }

  const base = cn("w-full border border-border bg-card object-cover", rounded, className);
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        className={base}
      />
    );
  }
  return (
    <img src={media.src} alt={media.alt} loading={eager ? "eager" : "lazy"} className={base} />
  );
}
