// AccessibilityMouse page: download links from the latest GitHub release, the video tabs,
// the nav's border once scrolled, and a gentle fade-in (skipped under Reduce motion).
// Normal browser scrolling throughout: nothing here moves the page.

const REPO = 'Crypto69/AccessibilityMouse';
const RELEASES = `https://github.com/${REPO}/releases/latest`;

document.documentElement.classList.add('js');

// Every download button starts at the latest-release page. When the GitHub API answers,
// each one points at its own file: a zip with "mac" or "windows" in its name.
async function releaseLinks() {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=5`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!r.ok) return;
    const release = (await r.json()).find((x) => !x.draft && !x.prerelease);
    if (!release) return;
    const asset = (re) => release.assets?.find((a) => re.test(a.name))?.browser_download_url;
    const urls = {
      mac: asset(/mac|macos|darwin/i),
      windows: asset(/windows|win/i),
    };
    document.querySelectorAll('[data-dl]').forEach((a) => {
      const url = urls[a.dataset.dl];
      if (url) a.href = url;
    });
    const version = (release.tag_name || '').replace(/^v/i, '');
    if (version) {
      document.querySelectorAll('[data-version]').forEach((el) => { el.textContent = `Latest: ${version}.`; });
    }
  } catch {
    // Offline or rate-limited: the buttons keep pointing at the latest-release page.
  }
}

function videoTabs() {
  const tabs = [...document.querySelectorAll('.tab')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (!on) panel.querySelector('video')?.pause();
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next);
      next.focus();
    });
  });
}

function navState() {
  const nav = document.querySelector('[data-nav]');
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function reveals() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  navState();
  videoTabs();
  reveals();
  releaseLinks();
});
