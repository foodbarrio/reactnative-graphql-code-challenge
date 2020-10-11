import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Post;
