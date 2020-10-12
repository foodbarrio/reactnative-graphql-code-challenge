import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!) {
    login(username: $username) {
      token
      user {
        id
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!, $title: String!) {
    createPost(content: $content, title: $title) {
      id
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($content: String, $title: String, $id: ID!) {
    editPost(content: $content, title: $title, id: $id) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      id
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($content: String!, $id: ID!) {
    editComment(content: $content, id: $id) {
      id
    }
  }
`;

export const LIKE = gql`
  mutation Like($commentId: ID, $postId: ID) {
    like(commentId: $commentId, postId: $postId) {
      id
    }
  }
`;

export const UNLIKE = gql`
  mutation UnLike($commentId: ID, $postId: ID) {
    unLike(commentId: $commentId, postId: $postId) {
      id
    }
  }
`;
