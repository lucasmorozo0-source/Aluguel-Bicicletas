import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const banco = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

try {
  await banco.authenticate();
  console.log("Conectado ao banco");
} catch (error) {
  console.log("Erro ao conectar", error);
}

export default banco;