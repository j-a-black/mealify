import { closeModal } from "./domManipulation.js";

export const getMealResults = () => {
  const inputValue = document
    .getElementById("input-field")
    .value.trim()
    .split(" ")
    .join("_");

  fetchFromApi(inputValue);
};

const fetchFromApi = async (inputValue) => {
  console.log(`Input Value is: ${inputValue}`);

  const loader = document.querySelector("#loading");
  loader.classList.add("display");

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
  const response = await fetch(url);
  const jsonListData = await response.json();
  const mealData = jsonListData.meals;

  if (jsonListData) loader.classList.remove("display");

  displayMealResults(mealData);
};

const displayMealResults = (fetchedApiArray) => {
  const displayedResults = document.querySelector(".search-results-grid");
  const totalItemCount = document.querySelector(".totalItemCount");
  let html = "";

  if (fetchedApiArray) {
    fetchedApiArray.map((meal) => {
      html += `
        <div class="result-item">
          <div id=${meal.idMeal}>
              <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              />
          </div>
          <div class="result-body">
              <h3>${meal.strMeal}</h3>
              <button class="open-modal-js">Get Recipe</button>
          </div>
        </div>
          `;
      totalItemCount.innerHTML = `Results: ${fetchedApiArray.length}`;
      //   getRecipe(meal);
    });
  } else {
    totalItemCount.innerHTML = `Results: ${0}`;
    html = `<p class="totalItemCount">Sorry, no results available</p>`;
  }

  displayedResults.innerHTML = html;
};

export const getRecipe = async (e) => {
  const mealID =
    e.target.parentElement.parentElement.firstElementChild.getAttribute("id");
  console.log(mealID);
  const modal = document.querySelector(".modal");
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  const response = await fetch(url);
  const jsonListData = await response.json();
  const mealData = jsonListData.meals;
  mealData.map((meal) => {
    console.log(mealData);
    let html = "";
    let ingredHtml = "";
    html = `
        <h1>${meal.strMeal}</h1>
        <p>${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank">See how on Youtube</a>
        `;
    const recipeContentDiv = modal.querySelector(".recipe-content");
    recipeContentDiv.innerHTML = html;

    // dynamically inject a list of ingredients and measurement/quantity for each ingredient
    const recipeIngredient = modal.querySelector(".recipe-ingredient-js");
    /*
     * MealDB lists up to 20 ingredients
     * First we need an array to store the ingredients
     * Next, we need to loop through all the ingredients in the Meal Object
       from the fetched API Array
     * Then we push the ingredients and the measuremens/quantity into the
       ingredients array
     */
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    ingredHtml = `
    <ul>${ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("")}</ul>
    `;
    recipeIngredient.innerHTML = ingredHtml;
  });
};
