const header = document.querySelector("header");
const heroH = document.querySelector(".hero h1");
const herop = document.querySelector(".getApp p");
const cards = document.querySelectorAll(".card");
const secImg = document.querySelector("img.main_img_s ");
const iframe = document.querySelector("iframe.vidFrame");
const texth2 = document.querySelector(".text h2");
const img1s = document.querySelectorAll(".img1s");
const builds = document.querySelectorAll(`.build h3, 
.build p,
.build span,
 .card_container,
 .invest_btn,
 .invest h1 ,
 .investTxt p 
   `);

const transitionList = [heroH, ...img1s, ...builds, herop, texth2, secImg];
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
        entry.target
          .querySelector(".icons img.icon")
          .classList.add("showBounce");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

cards.forEach((card) => {
  observer.observe(card);
});

const iframeObserve = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "playVideo",
              args: [],
            }),
            "*",
          );
          iframe.classList.add("playing");
        }, 1500);
      } else {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "pauseVideo",
            args: [],
          }),
          "*",
        );

        iframe.classList.remove("playing");
      }
    });
  },
  { threshold: 0.5 },
);

iframeObserve.observe(iframe);

const observerHeroH = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
transitionList.forEach((eachlist) => {
  observerHeroH.observe(eachlist);
});
