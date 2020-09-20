/**
 * List of all graphql mutations
 */

import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($userId: ID!, $content: String!, $title: String) {
    createPost(userId: $userId, content: $content, title: $title) {
      id
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($userId: ID!, $id: ID!, $content: String!, $title: String) {
    editPost(userId: $userId, id: $id, content: $content, title: $title) {
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

export const DELETE_POST = gql`
  mutation deletePost($userId: ID!, $id: ID!) {
    deletePost(userId: $userId, id: $id) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($userId: ID!, $postId: ID!, $content: String!, $title: String) {
    createComment(userId: $userId, postId: $postId, content: $content, title: $title) {
      id
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($userId: ID!, $id: ID!, $content: String!, $title: String) {
    editComment(userId: $userId, id: $id, content: $content, title: $title) {
      id
      content
      title
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($userId: ID!, $id: ID!) {
    deleteComment(userId: $userId, id: $id) {
      id
    }
  }
`;

export const LIKE = gql`
  mutation like($userId: ID!, $postId: ID, $commentId: ID) {
    like(userId: $userId, postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export const UNLIKE = gql`
  mutation unlike($userId: ID!, $postId: ID, $commentId: ID) {
    unlike(userId: $userId, postId: $postId,  commentId: $commentId) {
      id
    }
  }
`;