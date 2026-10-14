import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, FileCheck2, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DesignEntry, LessonEntry, MediaItem } from "@/data/designs";
import { cn } from "@/lib/utils";

type DesignMediaCarouselProps = {
  entry: DesignEntry | LessonEntry;
  autoplay?: boolean;
};

const controlVisibility =
  "opacity-0 transition-opacity duration-200 group-hover/media:opacity-100 group-focus-within/media:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100";

function MediaSlide({ item, videoRef }: { item: MediaItem; videoRef?: (node: HTMLVideoElement | null) => void }) {
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
        className="aspect-[3/2] w-full object-cover"
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      width={1200}
      height={800}
      loading="lazy"
      className="aspect-[3/2] w-full object-cover"
    />
  );
}

export function DesignMediaCarousel({ entry, autoplay = false }: DesignMediaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const hasMultipleSlides = entry.media.length > 1;

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

  const links = [
    { href: entry.repoUrl, label: "GitHub repository", icon: Github },
    { href: entry.liveUrl, label: "Live website", icon: ExternalLink },
    {
      href: entry.artifactUrl,
      label:
        "artifactLabel" in entry && entry.artifactLabel
          ? entry.artifactLabel
          : "Project artifact",
      icon: FileCheck2,
    },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: hasMultipleSlides }}
      tabIndex={0}
      aria-label={`${entry.title} media`}
      className="group/media overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CarouselContent className="ml-0">
        {entry.media.map((item, index) => (
          <CarouselItem key={`${item.src}-${index}`} className="pl-0">
            <MediaSlide
              item={item}
              videoRef={(node) => {
                videoRefs.current[index] = node;
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {links.length > 0 && (
        <TooltipProvider delayDuration={250}>
          <div
            className={cn(
              "absolute right-3 top-3 z-30 flex gap-2",
              controlVisibility,
            )}
          >
            {links.map(({ href, label, icon: Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="hairline h-9 w-9 rounded-sm border-media-icon/60 bg-media-scrim text-media-icon shadow-none transition-[color,transform,border-color] hover:scale-105 hover:border-primary hover:bg-media-scrim hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <a href={href} aria-label={label}>
                      <Icon aria-hidden className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      )}

      {hasMultipleSlides && (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous slide"
            className={cn(
              "hairline absolute left-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-sm border-media-icon/60 bg-media-scrim text-media-icon shadow-none hover:border-primary hover:bg-media-scrim hover:text-primary",
              controlVisibility,
            )}
          >
            <ArrowLeft aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            aria-label="Next slide"
            className={cn(
              "hairline absolute right-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-sm border-media-icon/60 bg-media-scrim text-media-icon shadow-none hover:border-primary hover:bg-media-scrim hover:text-primary",
              controlVisibility,
            )}
          >
            <ArrowRight aria-hidden />
          </Button>
          <div
            className={cn(
              "absolute left-3 top-3 z-20 flex gap-1.5 rounded-sm bg-media-scrim p-2",
              controlVisibility,
            )}
            aria-label="Choose slide"
          >
            {entry.media.map((item, index) => (
              <Button
                key={`${item.src}-dot-${index}`}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="h-3 w-3 rounded-full p-0 hover:bg-transparent"
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-2 w-2 rounded-full border border-media-icon",
                    index === activeIndex ? "bg-media-icon" : "bg-transparent",
                  )}
                />
              </Button>
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}