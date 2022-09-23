const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.querySelector(".modal__header-close").addEventListener("click", (e) => {
    closeModal(modal);
  });
  modal.addEventListener("mousedown", (e) => {
    const button = e.which || e.button;
    if (e.target != modal || button !== 1) return;
    closeModal(modal);
  });
});

export const openModal = (modal) => {
  modal.classList.add("active");
};

export const closeModal = (modal) => {
  modal.classList.add("closing");
  modal.classList.remove("active");
  modal.querySelector(".modal__container").addEventListener(
    "animationend",
    () => {
      modal.classList.remove("closing");
    },
    { once: true }
  );
};
