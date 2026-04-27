import Plano from "../models/Plano.js";

export const criarPlano = async (req, res) => {
  const plano = await Plano.create(req.body);
  res.json(plano);
};

export const listarPlanos = async (req, res) => {
  const planos = await Plano.findAll();
  res.json(planos);
};

export const buscarPlanoPorId = async (req, res) => {
  const plano = await Plano.findByPk(req.params.id);

  if (!plano) {
    return res.status(404).json({ erro: "Plano não encontrado" });
  }

  res.json(plano);
};

export const atualizarPlano = async (req, res) => {
  const plano = await Plano.findByPk(req.params.id);

  if (!plano) {
    return res.status(404).json({ erro: "Plano não encontrado" });
  }

  await plano.update(req.body);
  res.json(plano);
};

export const deletarPlano = async (req, res) => {
  const plano = await Plano.findByPk(req.params.id);

  if (!plano) {
    return res.status(404).json({ erro: "Plano não encontrado" });
  }

  await plano.destroy();
  res.json({ mensagem: "Plano deletado" });
};