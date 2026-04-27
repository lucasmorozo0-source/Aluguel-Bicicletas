import Aluguel from "../models/Aluguel.js";
import Plano from "../models/Plano.js";

export const criarAluguel = async (req, res) => {
  try {
    const { nomeCliente, dataHoraInicio, dataHoraFim, planoId } = req.body;

    const plano = await Plano.findByPk(planoId);
    if (!plano) {
      return res.status(404).json({ erro: "Plano não encontrado" });
    }

    const inicio = new Date(dataHoraInicio);
    const fim = new Date(dataHoraFim);

    const horas = (fim - inicio) / (1000 * 60 * 60);
    const valorTotal = horas * plano.valorHora;

    const aluguel = await Aluguel.create({
      nomeCliente,
      dataHoraInicio,
      dataHoraFim,
      tempoUtilizado: horas,
      valorTotal,
      planoId,
    });

    res.json(aluguel);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar aluguel" });
  }
};

export const listarAlugueis = async (req, res) => {
  const alugueis = await Aluguel.findAll();
  res.json(alugueis);
};

export const buscarAluguelPorId = async (req, res) => {
  const aluguel = await Aluguel.findByPk(req.params.id);
  if (!aluguel) return res.status(404).json({ erro: "Não encontrado" });

  res.json(aluguel);
};

export const atualizarAluguel = async (req, res) => {
  const aluguel = await Aluguel.findByPk(req.params.id);
  if (!aluguel) return res.status(404).json({ erro: "Não encontrado" });

  await aluguel.update(req.body);
  res.json(aluguel);
};

export const deletarAluguel = async (req, res) => {
  const aluguel = await Aluguel.findByPk(req.params.id);
  if (!aluguel) return res.status(404).json({ erro: "Não encontrado" });

  await aluguel.destroy();
  res.json({ mensagem: "Aluguel deletado" });
};