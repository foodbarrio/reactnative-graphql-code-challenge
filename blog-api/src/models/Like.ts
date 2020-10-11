import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Like = sequelize.define("like", {
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Like;
