document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".menu");

  function toggleMenu() {
    menu.classList.toggle("hide");
  }

  menuButton.addEventListener("click", toggleMenu);

  function handleResize() {
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);

  function viewerTemplate(pic, alt) {
    return `<div class="viewer">
              <button class="close-viewer">X</button>
              <img src="${pic}" alt="${alt}">
            </div>`;
  }

  function viewHandler(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === "img") {
      const src = target.getAttribute("src");
      const parts = src.split("-");
      const fullPic = parts[0] + "-full.jpeg";
      const viewerHTML = viewerTemplate(fullPic, target.getAttribute("alt"));
      document.body.insertAdjacentHTML("afterbegin", viewerHTML);
      const closeButton = document.querySelector(".close-viewer");
      closeButton.addEventListener("click", closeViewer);
    }
  }

  function closeViewer() {
    const viewer = document.querySelector(".viewer");
    if (viewer) {
      viewer.remove();
    }
  }

  const gallery = document.querySelector(".gallery");
  gallery.addEventListener("click", viewHandler);
});
