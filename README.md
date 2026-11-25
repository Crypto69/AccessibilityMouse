# AccessibilityMouse

Pointer speed and acceleration for each pointing device, made for people who use a
head mouse. Free for macOS 14+ and Windows 10/11.

**Website:** https://crypto69.github.io/AccessibilityMouse/
**Download:** [latest release](https://github.com/Crypto69/AccessibilityMouse/releases/latest)
(`AccessibilityMouse-…-mac.zip` and `AccessibilityMouse-…-windows.zip`)

This repository holds the website and the releases. The app's source code is private.

## The website

Static files, no build step, served by GitHub Pages from the root of `main`.

```
index.html
assets/css/site.css    styles: STL to Solid's look, calm scrolling
assets/js/site.js      download links from the latest release, video tabs, fade-ins
assets/img/            the app's real windows (from store-assets/tools in the app repo)
assets/video/          the Mac app preview and the Windows trailer, with posters
```

The download buttons start at the latest-release page. When the page loads, it asks
the GitHub API for the newest release and points each button at the zip whose name
contains `mac` or `windows`. Name release files that way.

Made for head-mouse users: normal browser scrolling (nothing pinned or smoothed),
buttons and links at least 44 px, a visible focus ring, and no motion when Reduce
Motion is on.

Preview locally:

```sh
python3 -m http.server 8766    # then open http://127.0.0.1:8766/
```

The window images and videos are made by the capture tools in the app repository
(`store-assets/tools`): `am-capture site-images <dir>` writes the Mac windows;
convert them to WebP before adding them here.

## Contact

support@myaccessibility.ai · [Privacy policy](https://myaccessibility.ai/accessibilitymouse-privacy) ·
[myaccessibility.ai](https://myaccessibility.ai/)
