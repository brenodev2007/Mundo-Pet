const form = document.querySelector("form");
const dataInput = document.querySelector("#date-agendamento");
const horarioInput = document.querySelector("#time-agendamento");
const petName = document.getElementById("#pet-name");
const name = document.getElementById("#owner-name");
const service = document.getElementById("#service");

import dayjs from "dayjs";

const diaAtual = dayjs(new Date()).format("MM-DD-YYYY");
const horaAtual = dayjs(new Date()).format("HH:mm");

//definir a data e horário mínima
dataInput.min = diaAtual;
horarioInput.min = horaAtual;

form.onsubmit = (e) => {
  e.preventDefault();

  // Limpa o container antes de criar novamente
  scheduleContainer.innerHTML = "";

  try {
    const name = name.value.trim();
    const petName = petName.value.trim();
    const service = service.value;

    if (!name || !petName || !service) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    //recupera os horários selecionados
    const dataSelecionada = dataInput.value;
    const horarioSelecionado = horarioInput.value;

    if (dataSelecionada < diaAtual) {
      alert("A data selecionada não pode ser anterior ao dia de hoje.");
      return;
    }

    if (horarioSelecionado < horaAtual) {
      alert("O horário selecionado não pode ser anterior ao horário atual.");
    }
  } catch (error) {
    console.error("Erro ao submeter o formulário:", error);
    alert(
      "Ocorreu um erro ao submeter o formulário. Por favor, tente novamente."
    );
  }
};

console.log(horaAtual);
