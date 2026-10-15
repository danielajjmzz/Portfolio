import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileCheck2,
  Github,
  type LucideIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { MediaItem } from "@/data/designs";
import { cn } from "@/lib/utils";

/** Anything with photos and optional links: visual work entries and teaching cards. */
export interface MediaEntry {
  title: string;
  media: MediaItem[];
  repoUrl?: string;
  liveUrl?: string;
  artifactUrl?: string;
  artifactLabel?: string;
}

type DesignMediaCarouselProps = {
  entry: MediaEntry;
  /** Aspect ratio class for each slide, e.g. "aspect-square" or "aspect-[16/10]". */
  aspect?: string;
  /** "hover" shows controls on hover/focus (cards); "always" keeps them visible (expanded view). */
  controls?: "hover" | "always";
  /** "cover" crops to fill (cards); "contain" shows the whole image (expanded view). */
  fit?: "cover" | "contain";
  /** When set, clicking a photo calls this (cards open the expanded view). */
  onOpen?: () => void;
  autoplay?: boolean;
  className?: string;
};

/** Above this many slides the dots switch to a "2 / 6" counter. */
const MAX_DOTS = 4;

/** A link counts as "coming soon" until it has a real URL; "#" is the placeholder in the data. */
const isPlaceholder = (href: string) => href.trim() === "#";

const controlButton =
  "flex items-center justify-center border border-media-icon/50 bg-media-scrim text-media-icon backdrop-blur-[2px] transition-[color,border-color,transform] hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function MediaSlide({
  item,
  fit,
  aspect,
  videoRef,
}: {
  item: MediaItem;
  fit: "cover" | "contain";
  aspect: string;
  videoRef?: (node: HTMLVideoElement | null) => void;
}) {
  const media = cn("w-full", aspect, fit === "cover" ? "object-cover" : "object-scale-down");
  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        aria-label={item.alt}
        muted
        playsInline
        controls
        preload="metadata"
        className={media}
      />
    );
  }
  return (
    <img src={item.src} alt={item.alt} width={1200} height={800} loading="lazy" className={media} />
  );
}

export function DesignMediaCarousel({
  entry,
  aspect = "aspect-[3/2]",
  controls = "hover",
  fit = "cover",
  onOpen,
  autoplay = false,
  className,
}: DesignMediaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const hasMultipleSlides = entry.media.length > 1;

  const visibility =
    controls === "always"
      ? ""
      : "opacity-0 transition-opacity duration-200 group-hover/media:opacity-100 group-focus-within/media:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100";

  const updateActiveSlide = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    updateActiveSlide(api);
    api.on("select", updateActiveSlide);
    api.on("reInit", updateActiveSlide);
    return () => {
      api.off("select", updateActiveSlide);
      api.off("reInit", updateActiveSlide);
    };
  }, [api, updateActiveSlide]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index !== activeIndex) video?.pause();
    });
  }, [activeIndex]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!api || !autoplay || reducedMotion || !hasMultipleSlides) return;
    const interval = window.setInterval(() => api.scrollNext(), 5000);
    return () => window.clearInterval(interval);
  }, [api, autoplay, reducedMotion, hasMultipleSlides]);

  // Only links present in the data are shown, so a project without a GitHub repo,
  // live site or file simply leaves that icon out.
  const links = (
    [
      { href: entry.repoUrl, label: "GitHub repository", Icon: Github },
      { href: entry.liveUrl, label: "Live link", Icon: ExternalLink },
      { href: entry.artifactUrl, label: entry.artifactLabel || "Project file", Icon: FileCheck2 },
    ] as Array<{ href?: string; label: string; Icon: LucideIcon }>
  ).filter((link): link is { href: string; label: string; Icon: LucideIcon } => Boolean(link.href));

  const carousel = (
    <Carousel
      setApi={setApi}
      opts={{ loop: hasMultipleSlides }}
      aria-label={`${entry.title} photos`}
      className={cn(
        "group/media relative isolate overflow-hidden rounded-frame border border-border bg-card",
        className,
      )}
    >
      <CarouselContent className="ml-0">
        {entry.media.map((item, index) => (
          <CarouselItem
            key={`${item.src}-${index}`}
            className="pl-0"
            aria-label={`Photo ${index + 1} of ${entry.media.length}`}
          >
            {onOpen && item.type === "image" ? (
              <button
                type="button"
                onClick={onOpen}
                aria-label={`Open ${entry.title}`}
                className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <MediaSlide item={item} fit={fit} aspect={aspect} />
              </button>
            ) : (
              <MediaSlide
                item={item}
                fit={fit}
                aspect={aspect}
                videoRef={(node) => {
                  videoRefs.current[index] = node;
                }}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {links.length > 0 && (
        <TooltipProvider delayDuration={250}>
          <div className={cn("absolute right-2.5 top-2.5 z-30 flex gap-1.5", visibility)}>
            {links.map(({ href, label, Icon }) => {
              const placeholder = isPlaceholder(href);
              const tip = placeholder ? `${label} — coming soon` : label;
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    {placeholder ? (
                      <button
                        type="button"
                        aria-label={tip}
                        aria-disabled="true"
                        onClick={(event) => event.preventDefault()}
                        className={cn(controlButton, "h-9 w-9 cursor-default")}
                      >
                        <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                      </button>
                    ) : (
                      <a
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(controlButton, "h-9 w-9 hover:scale-105")}
                      >
                        <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                      </a>
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{tip}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      )}

      {hasMultipleSlides && (
        <>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous photo"
            className={cn(
              controlButton,
              "absolute left-2.5 top-1/2 z-20 h-9 w-9 -translate-y-1/2",
              visibility,
            )}
          >
            <ArrowLeft aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next photo"
            className={cn(
              controlButton,
              "absolute right-2.5 top-1/2 z-20 h-9 w-9 -translate-y-1/2",
              visibility,
            )}
          >
            <ArrowRight aria-hidden className="size-4" />
          </button>
          {entry.media.length <= MAX_DOTS ? (
            <div
              role="group"
              aria-label="Choose photo"
              className={cn(
                "absolute left-2.5 top-2.5 z-20 flex gap-1 bg-media-scrim px-2 py-2 backdrop-blur-[2px]",
                visibility,
              )}
            >
              {entry.media.map((item, index) => (
                <button
                  key={`${item.src}-dot-${index}`}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to photo ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className="flex h-4 w-4 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block h-2 w-2 rounded-full border border-media-icon",
                      index === activeIndex ? "bg-media-icon" : "bg-transparent",
                    )}
                  />
                </button>
              ))}
            </div>
          ) : (
            // Many slides: a compact counter so it never collides with the link icons.
            <p
              aria-live="polite"
              className={cn(
                "absolute left-2.5 top-2.5 z-20 bg-media-scrim px-2.5 py-1.5 text-xs font-semibold tabular-nums text-media-icon backdrop-blur-[2px]",
                visibility,
              )}
            >
              <span className="sr-only">Photo </span>
              {activeIndex + 1} / {entry.media.length}
            </p>
          )}
        </>
      )}
    </Carousel>
  );

  // Captions only appear in the expanded view (controls always visible); cards stay clean.
  const hasCaptions = controls === "always" && entry.media.some((item) => item.caption);
  if (!hasCaptions) return carousel;
  return (
    <figure className="m-0">
      {carousel}
      <figcaption aria-live="polite" className="mt-3 min-h-5 text-sm font-semibold text-foreground">
        {entry.media[activeIndex]?.caption ?? ""}
      </figcaption>
    </figure>
  );
}
