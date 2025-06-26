const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const arquivoJson = path.join(__dirname, "agendamentos.json");

let agendamentosPorData = {};
if (fs.existsSync(arquivoJson)) {
  const conteudo = fs.readFileSync(arquivoJson, "utf8");
  try {
    agendamentosPorData = JSON.parse(conteudo) || {};
  } catch {
    agendamentosPorData = {};
  }
}
