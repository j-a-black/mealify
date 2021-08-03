"use strict";

import { getMealResults, getRecipe } from "./data.js";
import { openModal, closeModal } from "./domManipulation.js";

// Once the DOM has loaded, run the app
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState == "complete") initApp();
});

function initApp() {
  const searchBtn = document.querySelector(".search-btn-js");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getMealResults();
  });
  const closeModalBtn = document.querySelector(".close-modal");
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", closeModal);

  /*
   * Add Event Delegation to parent DIV w/classname of 'search-results-grid'
   * Once search results have been dynamically added to DOM;
   * Event handler checks to see if target of the click is the Get Recipe
   * button with class name 'open-modal-js'. If it is, function is called
   */
  const searchResultsDiv = document.querySelector(".search-results-grid");
  searchResultsDiv.addEventListener("click", (e) => {
    if (e.target.className === "open-modal-js") {
      getRecipe(e);
      openModal();
    }
  });

  const modal = document.querySelector(".modal");
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}
