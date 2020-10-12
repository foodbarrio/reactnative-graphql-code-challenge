import { gql } from "@apollo/client";

export const LOCALUSER = gql`
  query CurrentUser {
    User @client {
      id
    }
  }
`;

export const CURRENTUSER = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export const POSTS_QUERY = gql`
  query Posts($search: String) {
    posts(search: $search) {
      id
      title
      content
      author {
        username
      }
      likes {
        id
      }
      comments {
        id
      }
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      title
      content
      author {
        id
        username
      }
      likes {
        author {
          id
        }
        id
      }
      comments {
        id
        createdAt
        author {
          id
          username
        }
        content
        likes {
          author {
            id
          }
        }
      }
      createdAt
    }
    User @client {
      id
    }
  }
`;
