const express = require('express');
const router = express.Router();
const Aluguel = require('../models/Aluguel');
const Plano = require('../models/Plano');

router.post('/', async (req, res) => {
    const { nomeCliente, dataHoraInicio, dataHoraFim, planoId } = req.body;

    const plano = await Plano.findByPk(planoId);

    if (!plano) {
        return res.status(404).json({ erro: 'Plano não encontrado' });
    }

    const inicio = new Date(dataHoraInicio);
    const fim = new Date(dataHoraFim);

    const horas = (fim - inicio) / (1000 * 60 * 60);
    const valorTotal = horas * plano.valorHora;

    const aluguel = await Aluguel.create({
        nomeCliente,
        dataHoraInicio,
        dataHoraFim,
        planoId,
        tempoUtilizado: horas,
        valorTotal
    });

    res.json(aluguel);
});

router.get('/', async (req, res) => {
    const alugueis = await Aluguel.findAll({ include: Plano });
    res.json(alugueis);
});

module.exports = router;

router.put('/:id', async (req, res) => {
    const aluguel = await Aluguel.findByPk(req.params.id);
    if (!aluguel) return res.status(404).json({ erro: 'Não encontrado' });

    await aluguel.update(req.body);
    res.json(aluguel);
});

router.delete('/:id', async (req, res) => {
    const aluguel = await Aluguel.findByPk(req.params.id);
    if (!aluguel) return res.status(404).json({ erro: 'Não encontrado' });

    await aluguel.destroy();
    res.json({ mensagem: 'Aluguel deletado' });
});