const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const h_menu = document.querySelector(".ham_menu");
const links = document.querySelectorAll(".link");
const sv = document.getElementById("sv");

const h_sec = document.querySelector("#h_sec");
const linkSave = document.querySelector(".linkSave");
const muteBtnt = document.querySelector(".muteBtnt");
const introVideo = document.querySelector(".introVideo");
const skipIntro = document.querySelector(".skipIntro");
const linkRes = document.querySelector(".linkRes");
const heroH = document.querySelector(".hero h1");
const intro = document.querySelector(".intro");
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
const dontShow = document.querySelector(".dontShow");
const cookie = document.querySelector(".cookie");
const cookieBtns = document.querySelectorAll(".btnCookies button");
const dontShowInput = document.querySelector(".dontShowInput");
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
  } else {
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

const observerHeroH = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observerHeroH.unobserve(entry.target);
      }
    });
  },
  // { threshold: 0.1 },
);

function startPage() {
  cards.forEach((card) => {
    observer.observe(card);
  });

  transitionList.forEach((element) => {
    observerHeroH.observe(element);
  });

  iframeObserve.observe(iframe);
}

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
  sv.scrollIntoView({ behavior: "smooth" });
};
linkRes.onclick = function () {
  hamburger.classList.remove("open");
  h_menu.classList.remove("open");
  h_sec.scrollIntoView({ behavior: "smooth" });
};
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity") {
      card.classList.add("done");
    }
  });
});
function finished() {
  intro.classList.add("finished");
  introVideo.pause();
  document.body.style.overflow = "";
  setTimeout(() => {
    intro.remove();
    startPage();
  }, 1000);
}

introVideo.addEventListener("ended", () => {
  finished();
});
skipIntro.onclick = function () {
  finished();
};
if (localStorage.getItem("shouldShow") === null) {
  localStorage.setItem("shouldShow", "true");
}

dontShowInput.checked = localStorage.getItem("shouldShow") === "false";

dontShowInput.onchange = function () {
  localStorage.setItem("shouldShow", dontShowInput.checked ? "false" : "true");
};
if (localStorage.getItem("shouldShow") === "false") {
  intro.remove();
  startPage();
} else {
  intro.classList.add("show");
  document.body.style.overflow = "hidden";
}
const muteBtntI = document.querySelector(".muteIcon");

muteBtnt.onclick = function () {
  if (muteBtntI.classList.contains("fa-volume-high")) {
    muteBtntI.classList.remove("fa-volume-high");
    muteBtntI.classList.add("fa-volume-xmark");
    introVideo.muted = true;
  } else {
    muteBtntI.classList.remove("fa-volume-xmark");
    muteBtntI.classList.add("fa-volume-high");
    introVideo.muted = false;
  }
  console.log(introVideo.muted);
};

function checkVidToPlay() {
  if (window.innerWidth < 1100 && window.innerWidth > 500) {
    console.log("wrks  width<1100");
    introVideo.src = "video/mobile.mp4";
  }
  if (window.innerWidth <= 500) {
    console.log("wrks width>=500");
    introVideo.src = "video/smallMobile.mp4";
  }
  if (window.innerWidth > 1100) {
    console.log("wrks width>1100");
    introVideo.src = "video/intro.mp4";
  }
}
checkVidToPlay();
window.addEventListener("resize", () => {
  checkVidToPlay();
});

let storedCookie = localStorage.getItem("cookiesShow");
let showCook = storedCookie === null ? true : storedCookie === "true";

if (!showCook) {
  cookie.classList.add("hiddenCookie");
} else {
  cookie.classList.remove("hiddenCookie");
}
cookieBtns.forEach((cookieBtn) => {
  cookieBtn.addEventListener("click", () => {
    cookie.classList.add("hiddenCookie");
    showCook = false;
    localStorage.setItem("cookiesShow", "false");
  });
});
console.log(showCook)
window.addEventListener("scroll", () => {
  if (showCook) {
    cookie.classList.remove("hiddenCookie");
  }
});
