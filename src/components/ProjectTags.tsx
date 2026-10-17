import { cn } from "@/lib/utils";

/**
 * Project type and topic, shown as a pink eyebrow above the title ("CASE STUDY · UX DESIGN"),
 * the same spot and color as the teaching and visual cards' labels.
 * No borders or fills, so they never read as buttons.
 */
export function ProjectTags({
  tags,
  className,
}: {
  tags?: string[] | undefined;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.12em]",
        className,
      )}
      aria-label="Project tags"
    >
      {tags.map((tag, index) => (
        <li key={tag} className="flex items-center gap-2 text-link">
          {index > 0 && (
            <span aria-hidden className="text-dimmed">
              ·
            </span>
          )}
          {tag}
        </li>
      ))}
    </ul>
  );
}
