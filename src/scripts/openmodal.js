const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");

function openmodal() {
  modalOverlay.style.display = "flex";

  // Reinicia a animação ao abrir novamente
  const modal = modalOverlay.querySelector(".modal");
  modal.classList.remove("bounce");
  void modal.offsetWidth; // Reflow
  modal.classList.add("bounce");
}

closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Fechar clicando fora
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});
