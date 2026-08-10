"""Minimal redaction: block logos/brand titles only. Keep UI readable."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"
RAW = ROOT / "_raw"


def solid_box(
    im: Image.Image,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int],
) -> None:
    draw = ImageDraw.Draw(im)
    x0, y0, x1, y1 = [int(v) for v in box]
    draw.rectangle((x0, y0, x1, y1), fill=fill)


def process_kms(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    # Drop browser chrome + taskbar only
    im = im.crop((0, 118, 1920, 1040))
    # Logo + product name + tenant under logo
    solid_box(im, (8, 8, 210, 100), (15, 30, 60))
    # Admin name chip (small)
    solid_box(im, (im.width - 150, 10, im.width - 12, 46), (248, 250, 252))
    im.save(dest, optimize=True)
    print(f"wrote {dest.name} {im.size}")


def process_prm(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    # Top-left logo mark only
    solid_box(im, (8, 8, 56, 52), (15, 30, 60))
    # Admin chip
    solid_box(im, (im.width - 140, 10, im.width - 10, 48), (255, 255, 255))
    im.save(dest, optimize=True)
    print(f"wrote {dest.name} {im.size}")


def process_toc(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    # Drop browser (internal IP in address bar) + taskbar
    im = im.crop((0, 130, 1920, 1040))
    # Sidebar logo + system title
    solid_box(im, (8, 8, 220, 64), (15, 30, 60))
    # Avatar only
    solid_box(im, (im.width - 72, 8, im.width - 12, 56), (241, 245, 249))
    im.save(dest, optimize=True)
    print(f"wrote {dest.name} {im.size}")


def main() -> None:
    RAW.mkdir(exist_ok=True)
    jobs = [
        ("kms-console.png", "kms-console-v2.png", process_kms),
        ("prm-kaidashi.png", "prm-license-v2.png", process_prm),
        ("toc-cms.png", "toc-cms-v2.png", process_toc),
    ]
    for raw_name, out_name, fn in jobs:
        raw = RAW / raw_name
        if not raw.exists():
            raise SystemExit(f"missing raw {raw_name} — put original in public/projects/_raw/")
        fn(raw, ROOT / out_name)


if __name__ == "__main__":
    main()
