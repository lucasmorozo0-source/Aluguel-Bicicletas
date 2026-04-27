const express = require('express');
const router = express.Router();
const Plano = require('../models/Plano');

router.post('/', async (req, res) => {
    const plano = await Plano.create(req.body);
    res.json(plano);
});

router.get('/', async (req, res) => {
    const planos = await Plano.findAll();
    res.json(planos);
});

module.exports = router;

router.put('/:id', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).json({ erro: 'Não encontrado' });

    await plano.update(req.body);
    res.json(plano);
});

router.delete('/:id', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).json({ erro: 'Não encontrado' });

    await plano.destroy();
    res.json({ mensagem: 'Plano deletado' });
});