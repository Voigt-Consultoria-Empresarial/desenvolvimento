// No heavy JS needed; keep page snappy.
// Add minor enhancement: make entire header logo clickable to top.

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".brand__logo");
  if (logo) {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

