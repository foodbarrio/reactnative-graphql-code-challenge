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

export const EDIT_POST = gql`
  mutation editPost($userId: ID!, $id: ID!, $content: String!, $title: String) {
    editPost(userId: $userId, id: $id, content: $content, title: $title) {
      id
      content
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($userId: ID!, $id: ID!) {
    deletePost(userId: $userId, id: $id) {
      id
    }
  }
`;

export const LIKE = gql`
  mutation like($userId: ID!, $postId: ID!) {
    like(userId: $userId, postId: $postId) {
      id
    }
  }
`;

export const UNLIKE = gql`
  mutation unlike($userId: ID!, $postId: ID!) {
    unlike(userId: $userId, postId: $postId) {
      id
    }
  }
`;
