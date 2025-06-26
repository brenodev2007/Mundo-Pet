const form = document.getElementById("modal-form");
const btn = document.getElementById("submitBtn");

import moment from "moment";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputDate = document.getElementById("date");
  const inputTime = document.getElementById("time");
  const inputName = document.getElementById("owner-name");
  const inputPetName = document.getElementById("pet-name");
  const inputService = document.getElementById("service");

  try {
    const dataCompleta = moment(
      inputDate.value + " " + (inputTime?.value || "00:00"),
      "YYYY-MM-DD HH:mm"
    );

    const limite = moment("23:00", "HH:mm");
    if (dataCompleta.isAfter(limite)) {
      alert("O horário deve ser antes das 18h");
      return;
    }

    const nome = inputName?.value || "Sem nome";
    const pet = inputPetName?.value || "Sem pet";
    const servico = inputService?.value || "Sem serviço";
    const horario = dataCompleta.format("HH:mm");

    const dados = { nome, pet, servico, horario };

    // Envia ao servidor
    enviarParaServidor({
      nome,
      pet,
      servico,
      horario: dataCompleta.format("YYYY-MM-DD HH:mm"),
    });

    // Cria o item na lista
    periodos(dataCompleta, dados);
  } catch (error) {
    console.error("Erro ao processar o formulário:", error);
  }
});

function periodos(inputTime, dados) {
  const hora = inputTime.format("HH:mm");
  const hora24 = parseInt(inputTime.format("HH")); // Hora em formato 24h
  const periodo = inputTime.format("A");

  const li = document.createElement("li");
  li.textContent = `${hora} - ${dados.nome} (Pet: ${dados.pet}) - Serviço: ${dados.servico}`;

  //selecionando ul
  const manhaUl = document.querySelector(".manha");
  const tardeUl = document.querySelector(".tarde");
  const noiteUl = document.querySelector(".noite");

  if (periodo === "AM") {
    if (hora24 >= 6 && hora24 < 12) {
      console.log(
        `Horário selecionado: ${inputTime.format("hh:mm A")} - Período: Manhã`
      );
      manhaUl.appendChild(li);
    } else {
      console.log(
        `Horário selecionado: ${inputTime.format(
          "hh:mm A"
        )} - Período: Madrugada ou fora do horário`
      );
    }
  } else if (periodo === "PM") {
    if (hora24 >= 12 && hora24 < 18) {
      console.log(
        `Horário selecionado: ${inputTime.format("hh:mm A")} - Período: Tarde`
      );
      tardeUl.appendChild(li);
    } else if (hora24 >= 18 && hora24 < 24) {
      console.log(
        `Horário selecionado: ${inputTime.format("hh:mm A")} - Período: Noite`
      );
      noiteUl.appendChild(li);
    }
  }
}

// Envia os dados para server.js
function enviarParaServidor(dados) {
  fetch("http://localhost:3000/agendamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((res) => res.json())
    .then((res) => console.log("Resposta do servidor:", res))
    .catch((err) => console.error("Erro ao enviar:", err));
}
