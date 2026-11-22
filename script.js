const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 20) {
    console.log("scrolled");
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// window.addEventListener("scroll", () => {
//   header.classList.toggle("scrolled", window.scrollY > 20);
// });
