const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plano = sequelize.define('Plano', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valorHora: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING
    }
});

module.exports = Plano;