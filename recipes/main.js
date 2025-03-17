import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  return list[random(list.length)];
}

function tagsTemplate(tags) {
  let html = "";
  tags.forEach((tag) => {
    html += `<li>${tag}</li>`;
  });
  return html;
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `<figure class="recipe">
    <img src="${recipe.image}" alt="Image of ${recipe.name}" />
    <figcaption>
      <ul class="recipe__tags">
        ${tagsTemplate(recipe.tags)}
      </ul>
      <h2><a href="#">${recipe.name}</a></h2>
      <p class="recipe__ratings">
        ${ratingTemplate(recipe.rating)}
      </p>
      <p class="recipe__description">
        ${recipe.description}
      </p>
    </figcaption>
  </figure>`;
}

function renderRecipes(recipeList) {
  const container = document.querySelector(".recipe-container");
  container.innerHTML = recipeList
    .map((recipe) => recipeTemplate(recipe))
    .join("");
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

function filterRecipes(query) {
  const lowerQuery = query.toLowerCase();
  const filtered = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(lowerQuery);
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(lowerQuery);
    const tagsMatch = recipe.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const ingredientMatch = recipe.recipeIngredient.some((ingredient) =>
      ingredient.toLowerCase().includes(lowerQuery)
    );
    return nameMatch || descriptionMatch || tagsMatch || ingredientMatch;
  });
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const searchInput = document.querySelector("#search");
  const query = searchInput.value.trim();

  if (query === "") {
    init();
  } else {
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
  }
}

const searchForm = document.querySelector(".search_bar");
if (searchForm) {
  searchForm.addEventListener("submit", searchHandler);
}

init();
