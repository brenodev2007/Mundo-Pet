const form = document.getElementById("modal-form");
const btn = document.getElementById("submitBtn");

import moment from "moment";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputDate = document.getElementById("date");
  const inputTime = document.getElementById("time");
  const inputName = document.getElementById("name");

  try {
    const dataCompleta = moment(
      inputDate.value + " " + (inputTime?.value || "00:00"),
      "YYYY-MM-DD HH:mm"
    );
    const nameValue = inputName?.value || "Sem nome";

    periodos(dataCompleta);
  } catch (error) {
    console.error("Erro ao processar o formulário:", error);
  }
});

function periodos(inputTime) {
  const periodo = inputTime.format("A");

  const hora = inputTime.format("HH:mm");

  if (periodo === "AM") {
    console.log(`Horário selecionado: ${hora} - Período: Manhã`);
  } else if (periodo === "PM") {
    console.log(`Horário selecionado: ${hora} - Período: Tarde`);

    const limite = moment("18:00", "HH:mm");

    if (inputTime.isAfter(limite)) {
      console.log("Horário inválido: passou das 18h");
      alert("O horário deve ser antes das 18h");
      return;
    }
  }
}

function setManha() {}

function setTarde() {}

function setNoite() {}
