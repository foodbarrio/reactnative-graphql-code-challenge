import { gql } from "@apollo/client";

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      title
      content
      author {
        username
      }
      likes {
        id
        author {
          id
        }
      }
      comments {
        id
      }
      createdAt
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription CommentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      createdAt
      author {
        id
        username
      }
      content
      likes {
        id
        author {
          id
        }
      }
    }
  }
`;
