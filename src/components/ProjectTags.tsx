import { cn } from "@/lib/utils";

/** Project type and topic tags. The first tag (the type) is highlighted. */
export function ProjectTags({
  tags,
  className,
}: {
  tags?: string[] | undefined;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Project tags">
      {tags.map((tag, index) => (
        <li
          key={tag}
          className={cn(
            "border px-2.5 py-1 text-xs",
            index === 0
              ? "border-link bg-secondary font-medium text-link"
              : "border-border-strong bg-card text-foreground",
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
