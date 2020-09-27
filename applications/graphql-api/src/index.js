import { ApolloServer, gql } from "apollo-server";
import FoodbarrioDatasource from "./FoodbarrioDatasource";
import * as jwt from "jsonwebtoken";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Post {
    id: ID!
    author: User!
    title: String
    content: String
    liked: Like
    likesCount: Int
    commentsCount: Int
    comments: [Comment]
    createdAt: String!
  }

  type Comment {
    id: ID!
    parentPost: Post!
    author: User!
    content: String
    likesCount: Int
    liked: Like
    createdAt: String!
  }

  type Like {
    id: ID!
    parentPost: Post
    parentComment: Comment
    author: User!
    createdAt: String!
  }

  type Query {
    currentUser: User
    posts: [Post]
    myPosts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    login(username: String!): String
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String): Post
    createComment(parentPost: ID!, content: String!): Comment
    createLike(parentPost: ID, parentComment: ID): Like
    deleteLike(id: ID!): Like
  }
`;

const resolvers = {
  Query: {
    currentUser: async (root, args, { userId, dataSources }) => {
      if (!userId) return null;

      const currentUser = await dataSources.foodbarrio.getUser(userId);
      return currentUser;
    },
    posts: async (root, args, { dataSources }) => {
      const posts = await dataSources.foodbarrio.getAllPosts();

      for (let post of posts) {
        post.author = await dataSources.foodbarrio.getUser(post.author);

        const {
          likesCount,
          commentsCount
        } = await dataSources.foodbarrio.getPostStatistics(post.id);

        post.commentsCount = commentsCount;
        post.likesCount = likesCount;
      }

      return posts;
    },
    myPosts: async (root, args, { userId, dataSources }) => {
      if (!userId) return null;

      const me = await dataSources.foodbarrio.getUser(userId);
      const posts = await dataSources.foodbarrio.getAllMyPosts(userId);

      for (let post of posts) {
        const {
          likesCount,
          commentsCount
        } = await dataSources.foodbarrio.getPostStatistics(post.id);

        post.commentsCount = commentsCount;
        post.likesCount = likesCount;
      }

      return posts.map(post => ({ ...post, author: me }));
    },
    post: async (root, { id }, { dataSources, userId }) => {
      const post = await dataSources.foodbarrio.getPost(id);
      post.author = await dataSources.foodbarrio.getUser(post.author);
      post.comments = await dataSources.foodbarrio.getPostComments(id);
      let likes = await dataSources.foodbarrio.getPostLikes(id);
      post.liked = likes.find(like => like.author === userId);

      const {
        likesCount,
        commentsCount
      } = await dataSources.foodbarrio.getPostStatistics(id);

      post.commentsCount = commentsCount;
      post.likesCount = likesCount;

      for (let comment of post.comments) {
        comment.author = await dataSources.foodbarrio.getUser(comment.author);
        comment.likesCount = await dataSources.foodbarrio.getCommentStatistics(
          comment.id
        );

        let likes = await dataSources.foodbarrio.getCommentLikes(comment.id);
        comment.liked = likes.find(like => like.author === userId);
      }

      return post;
    }
  },
  Mutation: {
    login: async (root, { username }, { dataSources }) => {
      const user = await dataSources.foodbarrio.login(username);
      return jwt.sign({ id: user.id }, "JWT_SECRET");
    },
    createPost: async (root, args, { userId, dataSources }) => {
      const post = await dataSources.foodbarrio.createPost({
        ...args,
        author: userId
      });
      return post;
    },
    updatePost: async (root, args, { userId, dataSources }) => {
      const post = await dataSources.foodbarrio.updatePost(args);
      return post;
    },
    createComment: async (root, args, { userId, dataSources }) => {
      const comment = await dataSources.foodbarrio.createComment({
        ...args,
        author: userId
      });
      return comment;
    },
    createLike: async (root, args, { userId, dataSources }) => {
      const comment = await dataSources.foodbarrio.createLike({
        ...args,
        author: userId
      });
      return comment;
    },
    deleteLike: async (root, { id }, { dataSources }) => {
      const like = await dataSources.foodbarrio.deleteLike(id);
      return like;
    }
  }
};

// Optional: Export a function to get context from the request.
async function context({ req }) {
  const userId = await getUserId(req.headers["authorization"]);
  return {
    userId
  };
}

const getUserId = async authorization => {
  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.substring(7, authorization.length);
    return jwt.verify(token, "JWT_SECRET")?.id;
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    foodbarrio: new FoodbarrioDatasource()
  }),
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
