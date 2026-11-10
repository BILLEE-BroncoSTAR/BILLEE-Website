# BILL-EE Website

A plain HTML/CSS/JS site (no build step, no frameworks). Free to host on Vercel.

## Files

| File | What it does |
|---|---|
| `index.html` | Page structure and the text you read on the page |
| `site-config.js` | **Easiest place to edit:** links, rover videos, team leads, URC photo, SAR video, resources, photo collage |
| `styles.css` | Colors, fonts, layout (colors are at the very top) |
| `script.js` | Makes the page work (you rarely need to touch this) |
| `assets/` | Images and videos |
| `assets/leads/` | Team lead photos |
| `assets/collage/` | The 9 Team Moment photos (currently filler images) |

## Assets the site looks for

Included in this update:

- `logo.png` the BILL-EE horse logo (top bar, home section, footer, favicon). Taken from the Instagram profile picture.
- `bronco-star-logo.png` the Bronco STAR emblem (top bar, home section, footer). Taken from the Instagram profile picture, cropped to the inner emblem so the ring lettering is gone.
- `rover-assemble.mp4`, `arm-assemble.mp4`, `science-assemble.mp4` (and matching `-poster.jpg` stills): the rover viewer videos. Each starts exploded and assembles.
- `urc-scene.jpg` an illustration that shows only if the URC photo cannot load
- `leads/` four lead photos
- `collage/photo-01.jpg` to `photo-09.jpg` filler images

Your existing files (keep them as they are):

- `hero-bg.jpg` optional Mars/desert photo behind the home section
- `bronco-space-logo.png`, `cpp-logo.png` footer logos (hidden if missing)

Optional:

- `team-bg.jpg` moving background behind the Team Moment collage

No longer used (you can delete them from the repo): `urc-habitat.jpg`, and the old `rover-exploded`, `arm-exploded`, `science-exploded` videos and posters.

## Replace the filler collage photos (copy and paste)

1. Take your real photo and rename it to match a filler, for example `photo-01.jpg`.
2. On GitHub open `billee-site/assets/collage`, then **Add file > Upload files**, drag the photo in, and **Commit**. A file with the same name replaces the filler.
3. Any size works because each photo is cropped to fit its spot. About 1600 x 1200 looks best.
4. Optional: update the captions and descriptions in `site-config.js` under `collage`.

## Common changes (all in `site-config.js`)

- **SAR video:** `urcVideo.youtube` holds the YouTube link. It shows a card that opens the video on YouTube in a new tab. Change `title` and `caption` to change the text around it. To use a file instead, clear `youtube` and set `file: "assets/urc-video.mp4"` (keep it under 25 MB).
- **URC photo:** `urcPhoto.src`. It points at a free photo on Wikimedia Commons. To use your own, put a photo in `assets` and set `src: "assets/urc-photo.jpg"`, then change or empty `credit`.
- **Change a lead's photo or text:** edit the `leads` list. `blurb` is the paragraph, `tags` are the small labels. Photos are in `assets/leads/`.
- **Add, remove or reorder rover views:** edit `roverViews`. Each view is a title, text, a video, and a poster.
- **Rover animation speed:** change `roverSpeed` (1 = original speed, 0.5 = half speed).
- **Add a resource link:** copy one block in `resources` and change the text and link.
- **Instagram and the interest form:** change the links at the top under `links`.

## Other edits

- **Change page text:** edit `index.html`.
- **Change colors:** top of `styles.css` (`--red`, `--gold`).
- **Remove a section:** delete its `<section>` block in `index.html` and its link in the menu at the top of the file.

## Put it on GitHub and Vercel

1. Upload this folder's contents to your GitHub repository (see `UPLOAD-STEPS.txt`).
2. In Vercel, import the repository. Framework Preset: **Other**. No build command and no output directory. If the site files are in a `billee-site` folder, set **Root Directory** to `billee-site`.
3. Every time you commit a change on GitHub, Vercel redeploys automatically.

## Test on your computer

In this folder run `python3 -m http.server 8000` and open http://localhost:8000. (Opening `index.html` directly also works, but the rover videos load more reliably from a local server.)
