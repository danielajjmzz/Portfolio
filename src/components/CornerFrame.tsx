import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Architectural crop-mark frame: hairline border plus four corner brackets.
 */
export function CornerFrame({
  children,
  className,
  bordered = true,
}: {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <div className={cn("relative", bordered && "hairline", className)}>
      <Bracket className="left-[-1px] top-[-1px] border-l border-t" />
      <Bracket className="right-[-1px] top-[-1px] border-r border-t" />
      <Bracket className="bottom-[-1px] left-[-1px] border-b border-l" />
      <Bracket className="bottom-[-1px] right-[-1px] border-b border-r" />
      {children}
    </div>
  );
}

function Bracket({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 h-3.5 w-3.5 border-primary",
        className,
      )}
    />
  );
}

/** Section divider: hairline rule with a small centre tick and end brackets. */
export function SectionRule({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full bg-rule", className)} aria-hidden>
      <span className="absolute -top-1 left-0 h-2 w-px bg-primary" />
      <span className="absolute -top-1 right-0 h-2 w-px bg-primary" />
    </div>
  );
}
