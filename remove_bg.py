from PIL import Image
import numpy as np

img = Image.open('public/logo.jpeg').convert('RGBA')
data = np.array(img)

# The logo is cyan/teal and black outline. The checkerboard is white/grey.
# Let's find grey/white pixels where R, G, B are similar and > 150.
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
is_grey_or_white = (np.abs(r.astype(int) - g) < 20) & (np.abs(g.astype(int) - b) < 20) & (r > 150)

# Make those pixels transparent
data[is_grey_or_white, 3] = 0

Image.fromarray(data).save('public/logo.png')
print("Saved public/logo.png")
