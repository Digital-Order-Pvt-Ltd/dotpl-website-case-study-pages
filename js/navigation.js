document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector(".chapter-nav");
  if (!nav) return;

  const links = Array.from(
    nav.querySelectorAll('a[href^="#"]')
  );

  const items = links
    .map(link => {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      return target
        ? { link, target }
        : null;
    })
    .filter(Boolean);

  if (!items.length) return;

  const siteNav = document.querySelector(".site-nav");

  function getStickyOffset() {
    const siteNavHeight =
      siteNav ? siteNav.offsetHeight : 0;

    const chapterNavHeight =
      nav.offsetHeight;

    return siteNavHeight + chapterNavHeight;
  }

  function setActive(activeLink) {

    items.forEach(({ link }) => {

      if (link === activeLink) {
        link.classList.add("active");
        link.setAttribute(
          "aria-current",
          "true"
        );
      } else {
        link.classList.remove("active");
        link.removeAttribute(
          "aria-current"
        );
      }

    });

  }

function updateActiveLink() {

  const offset = getStickyOffset();

  let activeItem = items[0];

  items.forEach(item => {

    const top =
      item.target.getBoundingClientRect().top;

    if (top <= offset) {
      activeItem = item;
    }

  });

  setActive(activeItem.link);

}
  let ticking = false;

  function onScroll() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

      updateActiveLink();

      ticking = false;

    });

  }

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveLink
  );

  window.addEventListener(
    "load",
    updateActiveLink
  );

  updateActiveLink();

});