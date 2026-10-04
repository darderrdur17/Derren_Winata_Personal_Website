#!/usr/bin/env python3
"""Asset pipeline for the Derren Winata portfolio revamp.

1. Downscale + recompress oversized raster assets in public/.
2. Derive favicon / apple-touch-icon variants from the 2048px source.
3. Render a 1200x630 Open Graph social preview card on-brand.

Run:  python3 scripts/optimize-assets.py
Safe to re-run: all outputs are derived; sources are resized in place once.
"""

from __future__ import annotations

import colorsys
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"
ASSETS = ROOT / "assets"

# ---------------------------------------------------------------- brand tokens
# Mirrors src/index.css `.dark`: background 220 20% 6%, primary 174 72% 56%.
BG_HSL = (220, 0.20, 0.06)
PRIMARY_HSL = (174, 0.72, 0.56)


def hsl_to_rgb(h: float, s: float, l: float) -> tuple[int, int, int]:
    r, g, b = colorsys.hls_to_rgb(h / 360.0, l, s)
    return (round(r * 255), round(g * 255), round(b * 255))


BG = hsl_to_rgb(*BG_HSL)
PRIMARY = hsl_to_rgb(*PRIMARY_HSL)
FG = (238, 241, 245)
MUTED = (150, 160, 172)

OG_W, OG_H = 1200, 630


def load_font(size: int, weight: str = "regular") -> ImageFont.FreeTypeFont:
    """Resolve a system font. Prefers Inter, falls back to Helvetica/DejaVu."""
    candidates = {
        "regular": [
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ],
        "bold": [
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ],
        "mono": [
            "/System/Library/Fonts/Menlo.ttc",
            "/Library/Fonts/Courier New.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        ],
    }[weight]

    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def human(size: int) -> str:
    return f"{size / 1024:.0f}KB" if size < 1024 * 1024 else f"{size / 1024 / 1024:.2f}MB"


def resize_save(src: Path, dst: Path, max_w: int, quality: int, max_h: int | None = None) -> None:
    with Image.open(src) as im:
        im = im.convert("RGB")
        w, h = im.size
        scale = max_w / w
        new = (max_w, round(h * scale))
        if max_h and new[1] > max_h:
            scale = max_h / h
            new = (round(w * scale), max_h)
        if scale < 1:
            im = im.resize(new, Image.LANCZOS)
        before = src.stat().st_size if src.exists() else 0
        dst.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
        after = dst.stat().st_size
        print(f"  {src.name}: {w}x{h} {human(before)} -> {new[0]}x{new[1]} {human(after)}")


def build_og(portrait: Path, out: Path) -> None:
    card = Image.new("RGB", (OG_W, OG_H), BG)
    draw = ImageDraw.Draw(card)

    # --- subtle grid -------------------------------------------------------
    grid = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, OG_W, 40):
        gd.line([(x, 0), (x, OG_H)], fill=FG + (8,), width=1)
    for y in range(0, OG_H, 40):
        gd.line([(0, y), (OG_W, y)], fill=FG + (8,), width=1)
    card.paste(grid, (0, 0), grid)

    # --- accent glow, top-left --------------------------------------------
    glow = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(
        [-260, -300, 460, 300], fill=PRIMARY + (46,)
    )
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    card.paste(glow, (0, 0), glow)

# --- portrait, right side ---------------------------------------------
    # The source is a 4:3-ish tall portrait (e.g. 3840x5120). Crop the centred
    # square so the subject — typically mid-frame — stays in view regardless of
    # aspect ratio, then resize to 420x420 for crispness on 1x/2x displays.
    with Image.open(portrait) as im:
        im = im.convert("RGB")
        w, h = im.size
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        im = im.crop((left, top, left + side, top + side)).resize(
            (420, 420), Image.LANCZOS
        )
    mask = Image.new("L", (420, 420), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 419, 419), fill=255)
    card.paste(im, (740, 105), mask)

    # ring around portrait
    ring = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse([736, 101, 1164, 529], outline=PRIMARY + (150,), width=2)
    card.paste(ring, (0, 0), ring)

    # --- typography --------------------------------------------------------
    mono = load_font(22, "mono")
    eyebrow = load_font(24, "bold")
    title = load_font(76, "bold")
    body = load_font(30, "regular")

    draw.text((88, 132), "DERREN WINATA", font=eyebrow, fill=PRIMARY)
    draw.rectangle([88, 172, 148, 176], fill=PRIMARY)

    draw.text((88, 210), "I build systems", font=title, fill=FG)
    draw.text((88, 296), "that turn data", font=title, fill=FG)
    draw.text((88, 382), "into decisions.", font=title, fill=PRIMARY)

    draw.text(
        (88, 486),
        "Data  ·  AI  ·  Product  ·  Engineering",
        font=body,
        fill=MUTED,
    )
    draw.text(
        (88, 540),
        "NUS Data Science & Analytics  ·  Singapore",
        font=mono,
        fill=MUTED,
    )

    out.parent.mkdir(parents=True, exist_ok=True)
    # JPEG, not PNG: the card is a photographic composite and PNG doubles the
    # weight for no visible gain. Social crawlers fetch this on every share, so
    # keeping it under ~300KB measurably improves preview load time.
    card.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"  {out}: {OG_W}x{OG_H} {human(out.stat().st_size)}")


def build_favicon(src: Path) -> None:
    # Keep a pristine copy of the high-res source OUTSIDE public/ so it never
    # ships to production. Re-runs read it back from there.
    pristine = ASSETS / "favicon-source.png"
    if not pristine.exists() and src.exists():
        pristine.write_bytes(src.read_bytes())

    with Image.open(pristine if pristine.exists() else src) as im:
        im = im.convert("RGBA")
        for size, name in ((512, "favicon-512.png"), (180, "apple-touch-icon.png"), (64, "favicon.png")):
            out = PUBLIC / name
            im.resize((size, size), Image.LANCZOS).save(out, "PNG", optimize=True)
            print(f"  {name}: {size}x{size} {human(out.stat().st_size)}")


def main() -> None:
    print("Optimising imagery…")
    for name, max_w, quality in (
        ("profile-picture.jpeg", 800, 78),
        ("360cogni.jpeg", 1600, 78),
        ("eq-5d-5l.jpeg", 1600, 78),
        ("bassline.jpeg", 1600, 78),
    ):
        src = IMAGES / name
        if src.exists():
            resize_save(src, src, max_w, quality, max_h=1600)

    for name in ("360cogni-logo.png", "ai-singapore-logo.png"):
        p = IMAGES / name
        if p.exists():
            print(f"  {name}: {human(p.stat().st_size)} (already small)")

    print("Building favicon variants…")
    build_favicon(PUBLIC / "favicon.png")

    print("Building Open Graph card…")
    # Output path must match `siteConfig.ogImage` in src/lib/site.ts.
    build_og(IMAGES / "profile-picture.jpeg", PUBLIC / "og" / "og-home.jpg")


if __name__ == "__main__":
    main()
