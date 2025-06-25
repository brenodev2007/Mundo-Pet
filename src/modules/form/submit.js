const form = document.querySelector("form");
const dataInput = document.querySelector("#date-agendamento");
const horarioInput = document.querySelector("#time-agendamento");
import dayjs from "dayjs";

const diaAtual = dayjs(new Date()).format("DD-MM-YYYY");
const horaAtual = dayjs(new Date()).format("HH:mm");

//definir a data e horário mínima
dataInput.min = diaAtual;
horarioInput.min = horaAtual;

form.onsubmit = (e) => {
  e.preventDefault();

  const dataSelecionada = dataInput.value;
  const horarioSelecionado = horarioInput.value;

  if (dataSelecionada < diaAtual) {
    alert("A data selecionada não pode ser anterior ao dia de hoje.");
    return;
  }

  if (horarioSelecionado < horaAtual) {
    alert("O horário selecionado não pode ser anterior ao horário atual.");
  }
};

console.log(horaAtual);
