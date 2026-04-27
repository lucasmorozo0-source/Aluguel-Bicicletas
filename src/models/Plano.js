import { DataTypes } from "sequelize";
import banco from "../config/database.js";

const Plano = banco.define("Plano", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  valorHora: { type: DataTypes.FLOAT, allowNull: false },
  descricao: { type: DataTypes.STRING },
});

export default Plano;