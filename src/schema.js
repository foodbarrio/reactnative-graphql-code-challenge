/**
 * GraphQL schema used by Apollo server.
 */

const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Post {
    id: ID!
    title: String
    content: String!
    createdAt: String!
    userId: Int
    user: User!
    likes: [Like]
    comments: [Comment]
  }

  type Comment {
    id: ID!
    title: String
    content: String!
    createdAt: String!
    userId: Int!
    parentId: Int!
    user: User!
    post: Post!
    likes: [Like]
  }

  type Like {
    id: ID!
    createdAt: String!
    userId: Int!
    parentPostId: Int
    parentCommentId: Int
    user: User
  }

  type Query {
    users: [User]!
    posts: [Post]!
    likes(userId: ID!): [Like]!
    comments(parentId: ID!): [Comment]!
    comment: Comment
    post: Post
    user: User
  }

  type Mutation {
    login(name: String!): User!

    createPost(userId: ID!, content: String!, title: String): Post!
    editPost(userId: ID!, id: ID!, content: String!, title: String): Post!
    deletePost(userId: ID!, id: ID!): Post!

    createComment(userId: ID!, postId: ID!, content: String!, title: String): Comment!
    editComment(userId: ID!, id: ID!, content: String!, title: String): Comment!
    deleteComment(userId: ID!, id: ID!): Comment!

    like(userId: ID!, postId: ID, commentId: ID): Like!
    unlike(userId: ID!, postId: ID, commentId: ID): Like!
  }
`;

module.exports = typeDefs;