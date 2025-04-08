function filterProducts(category) {
  let products = document.querySelectorAll(".product");
  products.forEach((product) => {
    if (
      category === "all" ||
      product.getAttribute("data-category") === category
    ) {
      product.style.display = "inline-block";
    } else {
      product.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const filterLinks = document.querySelectorAll(".dropdown a");

  filterLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const category = link.getAttribute("data-category");
      filterProducts(category);
    });
  });
});
