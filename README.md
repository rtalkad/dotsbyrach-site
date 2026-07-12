# dotsbyrach — Rachna's Website

A simple, self-contained website. No coding tools or installs needed — just these
files and, eventually, a GitHub account.

## What's in here

```
index.html   ← all the page content and text
style.css    ← all the colours, fonts, spacing
script.js    ← the animations + the commission form logic
images/      ← put Rachna's real photos here
```

Everything sits flat, side by side — no subfolders for the code files. This is
deliberate: GitHub's drag-and-drop upload can mangle folder structure, so
keeping files flat avoids broken links entirely.

## The gallery is currently placeholder art

Right now the 6 gallery tiles are generated dot patterns, not real photos —
Instagram doesn't allow me to browse and pull images automatically. To get her
actual work in there:

1. Save 6+ of her best photos from Instagram (square-ish photos work best).
2. Come back to this conversation and either upload the photos to me, or just
   say "here are Rachna's gallery photos" and share them — I'll wire them into
   the gallery for you and hand back an updated version. You don't need to
   touch any code yourself.

If you'd rather do it yourself: name the files `mandala-01.jpg`, `mandala-02.jpg`
etc., drop them in `images/`, then ask me (or any developer) to point
the gallery tiles at `<img src="images/mandala-01.jpg">` instead of the
generated pattern in `script.js`.

## Easy text edits

Everything you'll want to personalize is in `index.html`, in plain English:

- **Bio** — search for `About the artist` and edit the paragraph text.
- **Tagline** — the big italic headline near the top (`Stillness, placed one dot at a time.`)
- **Instagram handle** — appears a few times as a link; already set to `dotsbyrach`.

Open `index.html` in any text editor (even Notepad), change the words between
the `<p>` and `</p>` tags, save, and refresh the page in your browser to see it.

## Publishing it for free with GitHub Pages

You don't need to know how to code. Here's the whole process:

1. **Create a GitHub account** at github.com if you don't have one — it's free.
2. **Create a new repository**
   - Click the "+" in the top right → "New repository"
   - Name it something like `dotsbyrach-site`
   - Keep it "Public", don't add a README (you already have one)
   - Click "Create repository"
3. **Upload the files**
   - On the new repo's page, click "Add file" → "Upload files"
   - Drag in `index.html`, `style.css`, `script.js`, and this README — all
     flat, no folders to worry about
   - Scroll down, click "Commit changes"
4. **Turn on GitHub Pages**
   - Go to the repo's "Settings" tab → "Pages" (left sidebar)
   - Under "Build and deployment" → "Source", choose "Deploy from a branch"
   - Branch: `main`, folder: `/ (root)` → "Save"
5. **Wait about a minute**, then refresh that Pages settings tab — it'll show
   a live URL, something like:
   `https://yourusername.github.io/dotsbyrach-site/`

That URL is the real, working website you can share with anyone.

Any time you want to change something later (swap a photo, fix a typo), just
upload the updated file the same way in step 3 — GitHub Pages updates
automatically within a minute or two.

If you get stuck on any of these steps, come back here and describe exactly
what you're seeing — happy to walk through it screen by screen.
