import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Comment = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Comment;
