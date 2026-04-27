import { DataTypes } from "sequelize";
import banco from "../config/database.js";

const Aluguel = banco.define("Aluguel", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeCliente: { type: DataTypes.STRING, allowNull: false },
  dataHoraInicio: { type: DataTypes.DATE, allowNull: false },
  dataHoraFim: { type: DataTypes.DATE, allowNull: false },
  tempoUtilizado: { type: DataTypes.FLOAT },
  valorTotal: { type: DataTypes.FLOAT },
  planoId: { type: DataTypes.INTEGER },
});

export default Aluguel;