document.documentElement.classList.add("js");

const revealTargets = document.querySelectorAll(".reveal");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-28% 0px -58% 0px",
      threshold: 0.01,
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
