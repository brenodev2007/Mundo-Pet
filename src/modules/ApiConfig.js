const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const arquivoJson = path.join(__dirname, "agendamentos.json");
