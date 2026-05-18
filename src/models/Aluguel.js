import { DataTypes } from "sequelize";
import banco from "../config/database.js";
import Plano from "./Plano.js";

const Aluguel = banco.define("Aluguel", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dataHoraInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  dataHoraFim: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  tempoUtilizado: {
    type: DataTypes.FLOAT,
  },

  valorTotal: {
    type: DataTypes.FLOAT,
  },

  planoId: {
    type: DataTypes.INTEGER,
  },
});

Aluguel.belongsTo(Plano, {
  foreignKey: "planoId",
});

Plano.hasMany(Aluguel, {
  foreignKey: "planoId",
});

export default Aluguel;