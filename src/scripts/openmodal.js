const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

export function openmodal() {
  modalOverlay.style.display = "flex";

  const modal = modalOverlay.querySelector(".modal");
  modal.classList.remove("bounce"); // reinicia animação
  void modal.offsetWidth;
  modal.classList.add("bounce");
}

function closemodal() {
  modalOverlay.style.display = "none";
}

// Eventos
openModalBtn?.addEventListener("click", openmodal);
closeModalBtn?.addEventListener("click", closemodal);
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closemodal();
  }
});
