"""
Makes a smaller 800px-wide WebP copy of every large photo in public/images
(saved next to it as <name>.800.webp) and records the originals in
src/data/image-variants.json, so cards and galleries can load the small copy.

Run after adding photos:  python3 scripts/make-image-variants.py
"""

import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
IMAGES = os.path.join(PUBLIC, "images")
MANIFEST = os.path.join(ROOT, "src", "data", "image-variants.json")
WIDTH = 800
MIN_WIDTH = 1000  # only photos wide enough for the copy to save real bytes

manifest = {}
for folder, _, files in os.walk(IMAGES):
    for name in sorted(files):
        if not name.lower().endswith((".jpg", ".jpeg", ".png", ".webp")) or ".800." in name:
            continue
        path = os.path.join(folder, name)
        with Image.open(path) as image:
            width, height = image.size
            if width < MIN_WIDTH:
                continue
            small = os.path.splitext(path)[0] + f".{WIDTH}.webp"
            if not os.path.exists(small) or os.path.getmtime(small) < os.path.getmtime(path):
                copy = image.convert("RGBA" if image.mode in ("RGBA", "LA", "P") else "RGB")
                copy = copy.resize((WIDTH, round(height * WIDTH / width)), Image.LANCZOS)
                copy.save(small, "WEBP", quality=80, method=6)
        manifest["/" + os.path.relpath(path, PUBLIC).replace(os.sep, "/")] = width

with open(MANIFEST, "w") as out:
    json.dump(dict(sorted(manifest.items())), out, indent=1)
    out.write("\n")
print(f"{len(manifest)} photos have an {WIDTH}px copy")
