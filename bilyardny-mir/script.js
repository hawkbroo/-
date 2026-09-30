const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const body = document.body;

toggle?.addEventListener("click", () => {
  const open = body.classList.toggle("nav-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    toggle?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const revealItems = document.querySelectorAll(
  ".section-head, .table-stat, .gallery-video, .gallery-feature, .gallery-item, .review-grid blockquote, .visit-card, .visit-photo"
);

revealItems.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

revealItems.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll(".table-count");
let counted = false;

const animateCount = (el) => {
  const target = Number(el.dataset.count || "0");
  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || counted) return;
      counted = true;
      counters.forEach(animateCount);
      countObserver.disconnect();
    });
  },
  { threshold: 0.5 }
);

const tablesSection = document.getElementById("tables");
if (tablesSection) countObserver.observe(tablesSection);
