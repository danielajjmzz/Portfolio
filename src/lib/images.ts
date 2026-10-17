import variants from "@/data/image-variants.json";

const originalWidths: Record<string, number> = variants;

/**
 * srcSet and sizes for a lazy photo that has a smaller 800px copy
 * (made by scripts/make-image-variants.py). `sizes="auto"` lets the browser pick
 * the copy that fits the space the photo is shown in; browsers without it fall back
 * to the full-size photo. Returns nothing for eager or small photos.
 */
export function responsiveImage(src: string | undefined, lazy = true) {
  const width = src ? originalWidths[src] : undefined;
  if (!src || !width || !lazy) return {};
  const small = src.replace(/\.(jpe?g|png|webp)$/i, ".800.webp");
  return { srcSet: `${small} 800w, ${src} ${width}w`, sizes: "auto, 100vw" };
}
