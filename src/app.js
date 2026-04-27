const express = require('express');
const sequelize = require('./config/database');

const Plano = require('./models/Plano');
const Aluguel = require('./models/Aluguel');

const planoRoutes = require('./routes/planoRoutes');
const aluguelRoutes = require('./routes/aluguelRoutes');

const app = express();

app.use(express.json());

app.use('/planos', planoRoutes);
app.use('/alugueis', aluguelRoutes);

// conexão com banco
sequelize.authenticate()
    .then(() => console.log('Conectado ao PostgreSQL 🚀'))
    .catch(err => console.error('Erro ao conectar:', err));

sequelize.sync()
    .then(() => console.log('Tabelas criadas 🚀'));

app.get('/', (req, res) => {
    res.json({ mensagem: 'API rodando 🚴‍♂️' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});