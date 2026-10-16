"""
Generates public/social-card.jpg, the default link-preview image (1200x630).

Re-run after changing the portrait or the profile line:
    python3 scripts/make-social-card.py

Requires Pillow and the Inter font family (system install or set INTER_DIR).
Text here must match verified facts in src/site.config.ts.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTRAIT = os.path.join(ROOT, "src/assets/profile/bruce-gale-portrait.jpg")
OUT = os.path.join(ROOT, "public/social-card.jpg")
FONTS = os.environ.get("INTER_DIR", "/usr/share/fonts/opentype/inter")

NAME = "Bruce Gale"
LINE_1 = "Business Analytics"
LINE_2 = "Auburn University  ·  Minor in Marketing"
DOMAIN = "brucehgale.com"

BG = (247, 245, 240)
TEXT = (27, 30, 35)
MUTED = (86, 92, 102)
ACCENT = (36, 66, 122)
BORDER = (228, 223, 213)

W, H = 1200, 630
S = 2  # draw at 2x, then downsample for smooth edges


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size * S)


card = Image.new("RGB", (W * S, H * S), BG)
draw = ImageDraw.Draw(card)

# Portrait on the right, 4:5, rounded corners.
pw, ph = 400, 500
px, py = W - pw - 72, (H - ph) // 2
portrait = Image.open(PORTRAIT).convert("RGB")
src_w, src_h = portrait.size
crop_h = int(src_w * ph / pw)
top = max(0, min(src_h - crop_h, int(src_h * 0.12)))
portrait = portrait.crop((0, top, src_w, top + crop_h)).resize((pw * S, ph * S), Image.LANCZOS)
mask = Image.new("L", (pw * S, ph * S), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw * S - 1, ph * S - 1), radius=28 * S, fill=255)
card.paste(portrait, (px * S, py * S), mask)

# Monogram.
x = 80
draw.rounded_rectangle((x * S, 96 * S, (x + 56) * S, 152 * S), radius=10 * S, fill=ACCENT)
mono = font("Inter-Bold.otf", 22)
draw.text(((x + 28) * S, 124 * S), "BG", font=mono, fill=(255, 255, 255), anchor="mm")

# Text block.
draw.text((x * S, 250 * S), NAME, font=font("InterDisplay-SemiBold.otf", 88), fill=TEXT, anchor="ls")
draw.text((x * S, 318 * S), LINE_1, font=font("Inter-Medium.otf", 34), fill=TEXT, anchor="ls")
draw.text((x * S, 368 * S), LINE_2, font=font("Inter-Regular.otf", 26), fill=MUTED, anchor="ls")

# Divider and domain.
draw.line((x * S, 470 * S, (x + 520) * S, 470 * S), fill=BORDER, width=2 * S)
draw.text((x * S, 528 * S), DOMAIN, font=font("Inter-SemiBold.otf", 26), fill=ACCENT, anchor="ls")

card = card.resize((W, H), Image.LANCZOS)
card.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
print(f"Wrote {os.path.relpath(OUT, ROOT)} ({os.path.getsize(OUT) // 1024} KB)")
