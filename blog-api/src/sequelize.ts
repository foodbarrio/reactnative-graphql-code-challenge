import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
