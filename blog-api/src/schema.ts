import generateToken from "./utils/generateToken";
const { gql, Kind } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";
import Like from "./models/Like";
import { Op } from "sequelize";
import isAuth from "./middlewares/isAuth";
import { PubSub, withFilter } from "apollo-server-express";

export const POST_ADDED = "POST_ADDED";
export const COMMENT_ADDED = "COMMENT_ADDED";
export const LIKE_ADDED = "LIKE_ADDED";

const pubsub = new PubSub();
export const typeDefs = gql`
  scalar Date
  union Liked = Post | Comment

  type Subscription {
    postAdded: Post
    commentAdded(postId: ID!): Comment
    likeAdded: Like
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
  }

  type Post {
    id: ID!
    author: User!
    title: String!
    likes: [Like]
    content: String!
    createdAt: Date!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    author: User!
    content: String!
    likes: [Like]
    post: Post!
    createdAt: Date!
  }

  type Like {
    id: ID!
    post: Post
    comment: Comment
    author: User!
    createdAt: Date!
  }

  type Query {
    currentUser: User!
    likes(postId: ID, commentId: ID): [Like]
    posts(search: String): [Post]
    getPost(id: ID!): Post!
    comments(postId: ID!): [Comment]
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
    editPost(id: ID!, content: String, title: String): Post!
    deletePost(id: ID!): Post!

    createComment(postId: ID!, content: String!): Comment!
    editComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment!

    like(postId: ID, commentId: ID): Like!
    unLike(postId: ID, commentId: ID): Like!

    login(username: String!): AuthPayload!
  }
`;

export const resolvers = {
  Query: {
    currentUser: (parent, { search }, context, info) => {
      const userId = isAuth(context.req, context.res);
      return User.findByPk(userId);
    },
    posts: (parent, { search }, context, info) => {
      if (search) {
        return Post.findAll({
          order: [["createdAt", "DESC"]],
        });
      }
      return Post.findAll();
    },
    getPost: (parent, { id }, context, info) => {
      return Post.findByPk(id);
    },
    likes: (parent, { postId, commentId }, context, info) => {
      if (postId && commentId) {
        context.res.status(500).json({ message: "internal server error" });
        throw new Error("");
      }
      if (postId) {
        return Like.findAll({ where: { postId } });
      }
      if (commentId) {
        return Like.findAll({ where: { commentId } });
      }
    },
    comments: (parent, { postId }, context, info) => {
      if (!postId) {
        context.res.status(500).json({ message: "internal server error" });
        throw new Error("");
      }
      return Comment.findAll({ where: { postId } });
    },
  },
  Mutation: {
    ///POST MUTATION
    createPost: async (parent, { title, content }, ctx, info) => {
      const userId = isAuth(ctx.req, ctx.res);
      console.log(userId);
      if (!userId) {
        console.log("YO");
        return;
      }
      const post = await Post.create({ title, content, userId });
      pubsub.publish(POST_ADDED, { postAdded: post });
      return post;
    },
    deletePost: async (parent, { id }, context, info) => {
      const userId = isAuth(context.req, context.res);
      const post = await Post.findOne({ where: { id, userId } });
      if (!post) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      await Post.destroy({ where: { userId, id } });
      return post;
    },
    editPost: async (parent, { id, title, content }, context, info) => {
      const userId = isAuth(context.req, context.res);
      const post: any = await Post.findOne({ where: { id, userId } });
      if (!post) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      post.save();
      return post;
    },
    //COMMENTMUTATION
    createComment: async (parent, { content, postId }, context, info) => {
      const userId = isAuth(context.req, context.res);
      const comment = await Comment.create({ content, postId, userId });
      pubsub.publish(COMMENT_ADDED, { commentAdded: comment });
      return comment;
    },
    deleteComment: async (parent, { id }, context, info) => {
      const userId = isAuth(context.req, context.res);
      const comment = await Comment.findOne({ where: { id, userId } });
      if (!comment) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      await Comment.destroy({ where: { userId, id } });
      return comment;
    },
    editComment: async (parent, { id, content }, context, info) => {
      const userId = isAuth(context.req, context.res);
      const comment: any = await Comment.findOne({ where: { id, userId } });
      if (!comment) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      if (content) {
        comment.content = content;
      }
      comment.save();
      return comment;
    },
    like: async (parent, { postId, commentId }, context, info) => {
      const userId = isAuth(context.req, context.res);
      if (postId && commentId) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      const like = await Like.create({ postId, commentId, userId });
      pubsub.publish(LIKE_ADDED, { commentAdded: like });
      return like;
    },
    unLike: async (parent, { postId, commentId }, context, info) => {
      const userId = isAuth(context.req, context.res);
      if (postId && commentId) {
        context.res.status(500).json({ message: "Internal server error" });
        throw new Error("");
      }
      let like;
      if (postId) {
        like = await Like.findAll({ where: { userId, postId } });
        await Like.destroy({ where: { userId, postId } });
      } else {
        like = await Like.findAll({ where: { userId, commentId } });
        await Like.destroy({ where: { userId, commentId } });
      }
      return like[0];
    },
    login: async (parent, { username }, ctx, info) => {
      let user = await User.findOne({ where: { username } });
      if (!user) {
        user = await User.create({ username });
      }

      const token = generateToken(user.get("id"));
      return { token, user };
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(COMMENT_ADDED),
        (payload, variables) => {
          return payload.commentAdded.dataValues.postId == variables.postId;
        }
      ),
    },
    likeAdded: {
      subscribe: pubsub.asyncIterator([LIKE_ADDED]),
    },
  },
  Post: {
    likes: {
      resolve: (parent, args, { request }, info) => {
        return Like.findAll({ where: { postId: parent.id } });
      },
    },
    comments: {
      resolve: (parent, args, { request }, info) => {
        return Comment.findAll({
          where: { postId: parent.id },
          order: [["createdAt", "DESC"]],
        });
      },
    },
    author: {
      resolve: (parent, args, { request }, info) => {
        return User.findByPk(parent.userId);
      },
    },
  },
  Comment: {
    likes: {
      resolve: (parent, args, { request }, info) => {
        return Like.findAll({ where: { commentId: parent.id } });
      },
    },
    author: {
      resolve: (parent, args, { request }, info) => {
        return User.findByPk(parent.userId);
      },
    },
    post: {
      resolve: (parent, args, { request }, info) => {
        return Post.findByPk(parent.postId);
      },
    },
  },
  Like: {
    author: {
      resolve: (parent, args, { request }, info) => {
        return User.findByPk(parent.userId);
      },
    },
    post: {
      resolve: (parent, args, { request }, info) => {
        return Post.findByPk(parent.postId);
      },
    },
    comment: {
      resolve: (parent, args, { request }, info) => {
        return Comment.findByPk(parent.commentId);
      },
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
