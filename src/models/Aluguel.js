const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Plano = require('./Plano');

const Aluguel = sequelize.define('Aluguel', {
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataHoraInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataHoraFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tempoUtilizado: {
        type: DataTypes.FLOAT
    },
    valorTotal: {
        type: DataTypes.FLOAT
    }
});

Aluguel.belongsTo(Plano, { foreignKey: 'planoId' });

module.exports = Aluguel;