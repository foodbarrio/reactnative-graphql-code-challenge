/**
 * List of all graphql queries
 */

import { gql } from '@apollo/client';


export const POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      comments {
        id
      }
      likes {
        id
        user {
          id
        }
      }
      user {
        id
        name
      }
    }
  }
`;

export const COMMENTS = gql`
  query comments($parentId: ID!) {
    comments(parentId: $parentId) {
      id
      title
      content
      createdAt
      likes {
        id
        user {
          id
        }
      }
      user {
        id
        name
      }
      post {
        id
      }
    }
  }
`;


