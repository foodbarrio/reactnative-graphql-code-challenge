import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    User: User
  }
`;

export const resolvers = {};
