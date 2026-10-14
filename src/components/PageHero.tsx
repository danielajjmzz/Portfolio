import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Renders a heading and colors its final period with the accent ("Projects."). */
export function AccentHeading({ text, className }: { text: string; className?: string }) {
  const trimmed = text.trimEnd();
  const hasDot = trimmed.endsWith(".");
  return (
    <h1 className={className}>
      {hasDot ? trimmed.slice(0, -1) : trimmed}
      <span className="accent-dot" aria-hidden={!hasDot}>
        .
      </span>
    </h1>
  );
}

/**
 * Top section shared by every page: identical height (300px content + 48px padding),
 * content vertically centered — a small muted line, a 56px heading, one line of body text.
 * Pass `aside` (Home's portrait) to place a 200px column on the left that stretches
 * to the text column's full height; `actions` sit at the bottom of the text column.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  aside,
  actions,
  className,
}: {
  eyebrow: string;
  title: string;
  body: ReactNode;
  aside?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12", className)}>
      <div
        className={cn(
          "mx-auto grid max-w-6xl px-5 md:min-h-[300px] md:px-8",
          aside ? "gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10" : "",
        )}
      >
        {aside && <div className="w-[200px] max-md:h-[260px] md:h-full">{aside}</div>}
        <div className={cn("flex min-w-0 flex-col justify-center", actions && "md:py-1")}>
          <p className="label-tech">{eyebrow}</p>
          <AccentHeading
            text={title}
            className={cn("mt-3 text-foreground", !aside && "max-w-4xl")}
          />
          <p className={"mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground"}>{body}</p>
          {actions && (
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-auto md:pt-5">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
