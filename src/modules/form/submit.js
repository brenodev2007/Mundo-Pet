const form = document.getElementById("modal-form");
const modalOverlay = document.getElementById("modalOverlay");
const removeAllBtn = document.getElementById("btnApagarTudo");
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

    // Cria o item na lista
    periodos(dataCompleta, dados);

    closemodal();
    form.reset();
  } catch (error) {
    console.error("Erro ao processar o formulário:", error);
  }
});

function periodos(inputTime, dados) {
  const hora = inputTime.format("HH:mm");
  const hora24 = parseInt(inputTime.format("HH"));
  const periodo = inputTime.format("A");

  const li = document.createElement("li");
  li.textContent = `${hora} - ${dados.nome} (Pet: ${dados.pet}) - Serviço: ${
    dados.servico
  } -Dia : ${inputTime.format("DD/MM/YYYY")}`;

  li.style.display = "flex";

  const remove = document.createElement("button");
  const img = document.createElement("img");
  img.src = "assets/remove.svg";
  remove.append(img);
  remove.classList.add("btn-remove");
  remove.addEventListener("click", () => {
    console.log(`Agendamento removido: ${li.textContent}`);
    li.remove();
  });

  li.appendChild(remove);
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

// Botão para remover todos os agendamentos
removeAllBtn.addEventListener("click", () => {
  const confirmacao = confirm(
    "Você tem certeza que deseja remover todos os agendamentos?"
  );
  if (confirmacao) {
    const manhaUl = document.querySelector(".manha");
    const tardeUl = document.querySelector(".tarde");
    const noiteUl = document.querySelector(".noite");
    manhaUl.innerHTML = "";
    tardeUl.innerHTML = "";
    noiteUl.innerHTML = "";
  }
});

function closemodal() {
  modalOverlay.style.display = "none";
}
