const header = document.querySelector("header");
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY >= 20);
});


cards.forEach((card) => {
  const icon = card.querySelector(".icons img.icon");
  const icon2 = card.querySelector(".icons img.icon2");

  card.addEventListener("mouseenter", () => {
    card.classList.add("hover");
    icon.classList.add("hide");
    icon2.classList.add("showHover");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover");
    icon2.classList.remove("showHover");
    icon.classList.remove("hide");
  });
});
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelector(".icons img.icon").classList.add("showBounce");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

cards.forEach((card) => {
  observer.observe(card);
});