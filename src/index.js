import express from "express";
import banco from "./config/database.js";
import cors from "cors";

import {
  criarPlano,
  listarPlanos,
  buscarPlanoPorId,
  atualizarPlano,
  deletarPlano,
} from "./controllers/planoControllers.js";

import {
  criarAluguel,
  listarAlugueis,
  buscarAluguelPorId,
  atualizarAluguel,
  deletarAluguel,
} from "./controllers/aluguelControllers.js";

import "./models/Plano.js";
import "./models/Aluguel.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando 🚀" });
});

// PLANOS
app.post("/planos", criarPlano);
app.get("/planos", listarPlanos);
app.get("/planos/:id", buscarPlanoPorId);
app.put("/planos/:id", atualizarPlano);
app.delete("/planos/:id", deletarPlano);

// ALUGUÉIS
app.post("/alugueis", criarAluguel);
app.get("/alugueis", listarAlugueis);
app.get("/alugueis/:id", buscarAluguelPorId);
app.put("/alugueis/:id", atualizarAluguel);
app.delete("/alugueis/:id", deletarAluguel);

await banco.sync();

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});