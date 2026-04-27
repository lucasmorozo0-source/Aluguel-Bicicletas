const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('aluguel_bicicletas', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;