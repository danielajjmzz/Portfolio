import { useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * A "View" circle that follows the mouse over an image that opens something.
 *
 * Put `handlers` and `activeClass` on the card (the element that receives the pointer events,
 * including any full-card link), `zoneRef` on the positioned element that wraps the image,
 * and render `bubble` inside that same element.
 *
 * - Mouse only: touch and pen never see it, and it never replaces keyboard focus styles.
 * - Over anything marked `data-view-cursor-ignore` (icon buttons, carousel arrows) the circle
 *   hides and the normal cursor comes back.
 * - With `match`, the circle shows only while the pointer is over an element matching that
 *   selector (e.g. a carousel slide that opens a preview) instead of anywhere in the zone.
 */
export function useViewCursor({ match }: { match?: string } = {}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const hide = () => setPos(null);

  const onPointerMove = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return hide();
    const zone = zoneRef.current;
    const target = event.target as Element | null;
    if (!zone || !target) return hide();
    if (target.closest("[data-view-cursor-ignore]")) return hide();
    if (match && !target.closest(match)) return hide();
    const rect = zone.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return hide();
    last.current = { x, y };
    setPos({ x, y });
  };

  return {
    zoneRef: zoneRef as RefObject<HTMLDivElement>,
    handlers: { onPointerMove, onPointerLeave: hide, onPointerDown: hide },
    /** Hides the system cursor while the circle is showing. */
    activeClass: pos ? "view-cursor-active" : "",
    bubble: (
      <ViewBubble shown={pos !== null} x={(pos ?? last.current).x} y={(pos ?? last.current).y} />
    ),
  };
}

function ViewBubble({ shown, x, y }: { shown: boolean; x: number; y: number }) {
  return (
    <span
      aria-hidden
      style={{ left: x, top: y }}
      className={cn(
        "pointer-events-none absolute z-30 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background/85 text-base font-semibold text-link backdrop-blur-[2px] transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-none",
        shown ? "scale-100 opacity-100" : "scale-75 opacity-0",
      )}
    >
      View
    </span>
  );
}
