const NAV_OFFSET = 80;

export function scrollToSection(href: string) {
  const id = href.replace('#', '');
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
