import { ExternalLink, FileCheck2, Github, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** A link counts as "coming soon" until it has a real URL; "#" is the placeholder in the data. */
const isPlaceholder = (href: string) => href.trim() === "#";

const iconButton =
  "relative z-10 flex h-9 w-9 items-center justify-center border border-media-icon/50 bg-media-scrim text-media-icon backdrop-blur-[2px] transition-[color,border-color,transform] hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/**
 * GitHub, live site and project file icons for a featured project card.
 * A missing link hides its icon; "#" shows it as "coming soon".
 */
export function ProjectLinks({
  repoUrl,
  liveUrl,
  fileUrl,
  fileLabel = "Project file",
  className,
}: {
  repoUrl?: string | undefined;
  liveUrl?: string | undefined;
  fileUrl?: string | undefined;
  fileLabel?: string;
  className?: string;
}) {
  const links = (
    [
      { href: repoUrl, label: "GitHub repository", Icon: Github },
      { href: liveUrl, label: "Live link", Icon: ExternalLink },
      { href: fileUrl, label: fileLabel, Icon: FileCheck2 },
    ] as Array<{ href?: string; label: string; Icon: LucideIcon }>
  ).filter((link): link is { href: string; label: string; Icon: LucideIcon } => Boolean(link.href));

  if (links.length === 0) return null;
  return (
    <TooltipProvider delayDuration={250}>
      <div data-view-cursor-ignore className={cn("flex gap-1.5", className)}>
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
                    className={cn(iconButton, "cursor-default")}
                  >
                    <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                  </button>
                ) : (
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(iconButton, "hover:scale-105")}
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
  );
}
