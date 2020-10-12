import { DataTypes, Sequelize } from "sequelize";

import sequelize from "../sequelize";

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default User;
