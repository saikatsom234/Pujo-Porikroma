from PIL import Image, ImageDraw
import sys

img_path = sys.argv[1]
out_path = sys.argv[2]

img = Image.open(img_path).convert("RGBA")
min_dim = min(img.size)
img = img.crop((
    (img.width - min_dim) // 2,
    (img.height - min_dim) // 2,
    (img.width + min_dim) // 2,
    (img.height + min_dim) // 2
))

mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, min_dim, min_dim), fill=255)

output = Image.new('RGBA', img.size, (0, 0, 0, 0))
output.paste(img, (0, 0), mask)
output.save(out_path, format="PNG")
