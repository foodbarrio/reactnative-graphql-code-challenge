/**
 * GraphQL schema used by Apollo server.
 */

const {gql} = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Post {
    id: ID!
    title: String
    content: String!
    cratedAt: String!
    userId: Int!
  }

  type Comment {
    id: ID!
    title: String
    content: String!
    cratedAt: String!
    userId: Int!
    parentId: Int!
  }

  type Like {
    id: ID!
    cratedAt: String!
    userId: Int!
    parentPostId: Int
    parentCommentId: Int
  }

  type Query {
    users: [User]!
    posts: [Post]!
    comments(parentId: ID!): [Comment]!
    post(id: ID!): Post
  }

  type Mutation {
    login(name: String): User!

    createPost(userId: ID!, content: String!, title: String): Post!
    editPost(userId: ID!, id: ID!, content: String!, title: String): Post!
    deletePost(userId: ID!, id: ID!): Boolean!

    createComment(userId: ID!, postId: ID!, content: String!, title: String): Comment!
    editComment(userId: ID!, id: ID!, content: String!, title: String): Comment!
    deleteComment(userId: ID!, id: ID!): Boolean!

    like(userId: ID!, postId: ID, commentId: ID): Boolean!
    unlike(userId: ID!, postId: ID, commentId: ID): Boolean!
  }
`;

module.exports = typeDefs;