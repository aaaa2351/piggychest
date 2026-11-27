const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const h_menu = document.querySelector(".ham_menu");
const links = document.querySelectorAll(".link");
const sv = document.getElementById("sv");

const h_sec = document.querySelector("#h_sec");
const linkSave = document.querySelector(".linkSave");
const linkRes = document.querySelector(".linkRes");
const heroH = document.querySelector(".hero h1");
const herop = document.querySelector(".getApp p");
const cards = document.querySelectorAll(".card");
const secImg = document.querySelector("img.main_img_s ");
const iframe = document.querySelector("iframe.vidFrame");
const texth2 = document.querySelector(".text h2");
const img1s = document.querySelectorAll(".img1s");
const investCards = document.querySelectorAll(".invest_card");
const cardConts = document.querySelectorAll(".card");
const imageBanner = document.querySelectorAll(".imageBanner");
const testCards = document.querySelectorAll(".cardT");
const builds = document.querySelectorAll(`.build h3, 
.build p,
.build span,
 .invest_btn,
 .invest h1 ,
 .investTxt p ,
 .txtVid h2,
 .txtVid p,
 .txtsH h1,
 .txtInvest .titl,
 .txtInvest .desc
   `);

const transitionList = [
  heroH,
  ...img1s,
  ...imageBanner,
  ...testCards,
  ...cardConts,
  ...investCards,
  ...builds,
  herop,
  texth2,
  secImg,
];
window.addEventListener("scroll", () => {
  if (window.scrollY >= 20) {
    header.classList.add("scrolled");
  }
 else {
    header.classList.remove("scrolled");
  }
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
        setTimeout(() => {
          entry.target
            .querySelector(".icons img.icon")
            .classList.add("showBounce");
          observer.unobserve(entry.target);
        }, 20);
      }
    });
  },
  { threshold: 0.5 },
);

cards.forEach((card) => {
  observer.observe(card);
});
let pTime;
const imgVid = document.querySelector(".rt_invest");
const iframeObserve = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pTime = setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: "playVideo",
              args: [],
            }),
            "*",
          );
          iframe.classList.add("playing");

          imgVid.classList.add("play");
        }, 1500);
      } else {
        clearTimeout(pTime);
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "pauseVideo",
            args: [],
          }),
          "*",
        );

        iframe.classList.remove("playing");
        imgVid.classList.remove("play");
      }
    });
  },
  { threshold: 0.2 },
);

iframeObserve.observe(iframe);

const observerHeroH = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observerHeroH.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
transitionList.forEach((eachlist) => {
  observerHeroH.observe(eachlist);
});
window.addEventListener("click", () => {
  clearTimeout(pTime);
  iframe.classList.remove("playing");
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "pauseVideo",
      args: [],
    }),
    "*",
  );
  imgVid.classList.remove("play");
});

hamburger.onclick = function () {
  hamburger.classList.toggle("open");
  h_menu.classList.toggle("open");
};
linkSave.onclick = function () {
  hamburger.classList.remove("open");
  h_menu.classList.remove("open");
  sv.scrollIntoView({ behaviour: "smooth" });
};
linkRes.onclick = function () {
  hamburger.classList.remove("open");
  h_menu.classList.remove("open");
  h_sec.scrollIntoView({ behaviour: "smooth" });
};
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity") {
      card.classList.add("done");
    }
  });
});