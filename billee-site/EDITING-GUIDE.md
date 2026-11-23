# BILL-EE website: how to edit and update

Almost everything you'll want to change is in **`site-config.js`**. Open it on GitHub, click the pencil icon, edit the text between the quotes, and click **Commit changes**. Vercel redeploys in about a minute.

Rules for editing `site-config.js`:
- Change only the text inside the quotes. Keep the quotes and the comma at the end of each line.
- To hide something, set it to `""` (empty quotes).
- If the site goes blank after an edit, a quote or comma is missing. Undo the last commit on GitHub.

## Common edits

| To change... | Look for this in `site-config.js` |
|---|---|
| A lead's name, title, or photo | `subteams:` then the team's `leads:` list |
| A blank lead photo | Set `photo: "leads/firstname-lastname.jpg"` after uploading the photo to the `leads/` folder (about 4:5, portrait) |
| Rover descriptions | `subsystems:` then `paragraphs:` and `specs:` |
| About text or team photos | `about:` (`teamPhotos:` has one line per year; the first one shows first, the year buttons on the photo switch between them) |
| Gallery photos | `gallery:` (grouped by year; one line per photo inside each year's `photos:` list. To add a year, copy a `{ year: ..., photos: [...] },` block) |
| Repos and documents | `resources:` and each team's `links:` |
| Email, interest form, Instagram | `links:` at the top |

## Adding photos

Two options:
1. **Upload to the repo:** put the file in the `img/` folder and write `"img/your-file.jpg"`.
2. **Use Google Drive:** write `drive("FILE_ID")`. The FILE_ID is the long code in a Drive link (`drive.google.com/file/d/FILE_ID/view`). The file must be shared as "Anyone with the link". The gallery photos currently load this way from the team Drive, so don't move or un-share those files.

## Adding the SAR 2027 video to the home screen

In `hero:` either
- set `videoFile: "assets/sar-2027.mp4"` (upload the file to `assets/`; it plays silently in the background, keep it short and under ~25 MB), or
- set `youtube: "https://www.youtube.com/watch?v=..."` to add a "Watch our SAR 2027 video" button.

## Science extras (ready when you are)

In the Science team entry:
- `procedureVideo`: a video of the science module running its procedure (`"assets/science-procedure.mp4"` or a YouTube link).
- `experimentDoc`: the science experiment document. Use a Google Doc **File > Share > Publish to web** link, or a PDF in `assets/`.

## Fusion 360 CAD

When the Fusion repo is public, put its link in two places: the Mechanical team's `links:` (`href`) and the "Fusion 360 CAD" item in `resources:`. Delete `soon: true` in both.

## Files

- `index.html`: page structure (rarely needs edits)
- `styles.css`: colors, fonts, layout. The brand colors are at the top under `:root`.
- `script.js`: builds the page from the config. No need to edit.
- `fonts/science-gothic.woff2`: the Science Gothic font (SIL Open Font License), self-hosted.
- `logos/`: cleaned-up logos. `bronco-star-logo-with-motto.png` is the original, unused.
- `leads/`: team lead photos. `img/`: team photo.
- `assets/`: the exploded-view videos and their posters.
- No longer used (safe to delete): `assets/leads/`, `assets/collage/`, `assets/logo.png`, `assets/bronco-star-logo.png`, `assets/urc-scene.jpg`, `README.md`, `UPLOAD-STEPS.txt`.

## Other settings

- `hero.coordinates` / `hero.place`: the Cal Poly Pomona coordinates in the footer.
- `hero.stats`: the numbers in the band below the About section.
- `still`: in `subsystems:`, shows one image instead of an exploded-view video (the Science Module uses `assets/science-module.jpg`). To go back to the video, delete `still` and add `video` and `poster` again.
- `explodedLabel`: the label on the exploded-view videos ("2024 rover model").
- `roverSpeed`: keep at 1. Slower speeds make the exploded views look choppy.

## Phones

On phones the site hides the exploded-view videos and shows a photo of each subsystem instead. The tabs become buttons and the menu collapses.
