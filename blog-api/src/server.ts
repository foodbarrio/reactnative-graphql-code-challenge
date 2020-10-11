import express from "express";
import dotenv from "dotenv";
import sequelize from "./sequelize";
import Post from "./models/Post";
import Comment from "./models/Comment";
import User from "./models/User";
import Like from "./models/Like";
import http from "http";
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");

User.hasMany(Post);
User.hasMany(Comment);
User.hasMany(Like);

Post.belongsTo(User);
Post.hasMany(Comment);

Comment.belongsTo(Post);
Comment.belongsTo(User);

Like.belongsTo(User);

dotenv.config();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize
  .sync({ force: true })
  .then((res) => {
    httpServer.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
      );
    });
  })
  .catch((error) =>
    console.log("Error starting sequelize, check your postgres instance")
  );
