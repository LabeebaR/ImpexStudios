import shutil
import os

os.makedirs('public/images', exist_ok=True)

files = [
    ('C:/Users/rehma/.gemini/antigravity/brain/338480a4-1146-4572-b8ac-aa0530a9fd34/.user_uploaded/media_1792010528804_a0dc80c7.png', 'public/images/dark-glow-reference.png'),
    ('C:/Users/rehma/.gemini/antigravity/brain/338480a4-1146-4572-b8ac-aa0530a9fd34/.user_uploaded/media_1792010566485_d315901b.png', 'public/images/neon-glass-reference.png'),
    ('C:/Users/rehma/.gemini/antigravity/brain/338480a4-1146-4572-b8ac-aa0530a9fd34/.user_uploaded/media_1792010615367_1670c467.png', 'public/images/digital-pro-reference.png'),
    ('C:/Users/rehma/.gemini/antigravity/brain/338480a4-1146-4572-b8ac-aa0530a9fd34/.user_uploaded/media_1792010637894_d3ffb01d.png', 'public/images/iridescent-sphere.png')
]

for src, dst in files:
    try:
        shutil.copyfile(src, dst)
        print(f"Copied {src} -> {dst}")
    except Exception as e:
        print(f"Error copying {src}: {e}")
