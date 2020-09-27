import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($username: String!) {
    login(username: $username)
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($parentPost: ID!, $content: String!) {
    createComment(parentPost: $parentPost, content: $content) {
      id
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation CreateLike($parentPost: ID, $parentComment: ID) {
    createLike(parentPost: $parentPost, parentComment: $parentComment) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: ID!) {
    deleteLike(id: $id) {
      id
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      title
      content
      likesCount
      commentsCount
      liked {
        id
      }
      author {
        username
      }
      comments {
        id
        content
        likesCount
        liked {
          id
        }
        author {
          username
        }
      }
      createdAt
    }
  }
`;

export const GET_MY_POSTS = gql`
  query GetMyPosts {
    myPosts {
      id
      title
      content
      author {
        username
      }
      commentsCount
      likesCount
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      content
      author {
        username
      }
      commentsCount
      likesCount
    }
  }
`;
