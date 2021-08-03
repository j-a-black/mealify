export const openModal = () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

export const closeModal = () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
