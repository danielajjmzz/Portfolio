import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { TeachingMedia } from "@/data/teaching";
import { responsiveImage } from "@/lib/images";
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
  still = false,
}: {
  media: TeachingMedia;
  /** Sizing / aspect classes, e.g. "aspect-[16/9]". */
  className?: string;
  rounded?: string;
  eager?: boolean;
  /** Show a video's poster image instead of the video (e.g. inside a card link). */
  still?: boolean;
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

  const base = cn(
    "w-full border border-border bg-card object-cover",
    media.fit === "contain" && "bg-white object-contain p-1",
    rounded,
    className,
  );
  if (media.type === "video" && still && media.poster) {
    return (
      <img
        src={media.poster}
        {...responsiveImage(media.poster, !eager)}
        alt={media.alt}
        loading={eager ? "eager" : "lazy"}
        className={base}
      />
    );
  }
  if (media.type === "video" && media.sound) {
    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        controls
        playsInline
        preload="metadata"
        className={cn(base, "bg-black object-contain")}
      />
    );
  }
  if (media.type === "video") {
    return <AutoplayVideo src={media.src} poster={media.poster} alt={media.alt} className={base} />;
  }
  return (
    <img
      src={media.src}
      {...responsiveImage(media.src, !eager)}
      alt={media.alt}
      loading={eager ? "eager" : "lazy"}
      className={base}
    />
  );
}

/**
 * Silent looping clip with a pause button, so motion can be stopped (WCAG 2.2.2).
 * Visitors who ask for reduced motion see it paused on its first frame until they press play.
 */
function AutoplayVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string | undefined;
  alt: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    // The frame classes (size, aspect, border, grid span) go on the wrapper so the clip
    // sits in layouts exactly like a photo; the video fills it.
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-2 right-2 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {playing ? (
          <Pause aria-hidden className="size-4" />
        ) : (
          <Play aria-hidden className="size-4" />
        )}
      </button>
    </div>
  );
}
