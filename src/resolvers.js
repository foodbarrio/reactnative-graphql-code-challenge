/**
 * Query and Mutation resolvers
 */
const validations = require("./validations.js");
const {UserInputError} = require("apollo-server");


module.exports = {
  Query: {
    users: async (_, __, {dataSources: {db}}) => await db('user'),
    posts: async (_, __, {dataSources: {db}}) => await db('post'),
    post: async (_, {id}, {dataSources: {db}}) => await db('post').where({id}),
    comments: async (_, {parentId}, {dataSources: {db}}) => await db('comment').where({parentId}),
  },

  Post: {
    user: async (parent, __, {dataSources: {db}}) => await db('user').where({id: parent.userId}).first(),
    comments: async (parent, __, {dataSources: {db}}) => await db('comment').where({parentId: parent.id}),
    likes: async (parent, __, {dataSources: {db}}) => await db('like').where({parentPostId: parent.id}),
  },

  Comment: {
    user: async (parent, __, {dataSources: {db}}) => await db('user').where({id: parent.userId}).first(),
    post: async (parent, __, {dataSources: {db}}) => await db('post').where({id: parent.parentId}).first(),
    likes: async (parent, __, {dataSources: {db}}) => await db('like').where({parentCommentId: parent.id}),
  },

  Mutation: {
    // User actions
    login: async (_, {name}, {dataSources: {db}}) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        throw new UserInputError("Name cannot be an empty string")
      }
      
      // if user exists return it, otherwise return a new user
      const user = await db('user').where({name: trimmedName}).first();
      if (user) {
        return user;
      } else {
        const [newUser] = await db('user').insert({name: trimmedName}, ['*']);
        return newUser;
      }
    },

    // Post actions
    createPost: async (_, {userId, content, title}, {dataSources: {db}}) => {
      await validations.isUser(userId, db);

      const [newPost] = await db('post').insert({
        userId: userId,
        content,
        title,
        createdAt: new Date(),
      }, ['*']);
      return newPost;
    },
    editPost: async (_, {userId, id, content, title}, {dataSources: {db}}) => {
      await validations.owns(userId, id, 'post', db);

      const [post] = await db('post')
        .where({id})
        .update({content, title}, ['*']);
      return post;
    },
    deletePost: async (_, {userId, id}, {dataSources: {db}}) => {
      await validations.owns(userId, id, 'post', db);

      const post = await db('post').where({id}).first();
      await db('comment').where({parentId: id}).del();
      await db('post').where({id}).first().del();
      return post;
    },

    // Comment actions
    createComment: async (_, {userId, postId, content, title}, {dataSources: {db}}) => {
      await validations.isUser(userId, db);
      await validations.exists(postId, 'post', db);

      const [newComment] = await db('comment').insert({
        userId: userId,
        parentId: postId,
        content,
        title,
        createdAt: new Date(),
      }, ['*']);
      return newComment;
    },
    editComment: async (_, {userId, id, content, title}, {dataSources: {db}}) => {
      await validations.owns(userId, id, 'comment', db);

      const [comment] = await db('comment')
        .where({id})
        .update({content, title}, ['*']);
      return comment;
    },
    deleteComment: async (_, {userId, id}, {dataSources: {db}}) => {
      await validations.owns(userId, id, 'comment', db);

      const comment = await db('comment').where({id}).first();
      await db('comment').where({id}).first().del();
      return comment;
    },

    // Like actions
    like: async (_, {userId, postId = null, commentId = null}, {dataSources: {db}}) => {
      validations.hasOneParent(postId, commentId);
      if (postId) {
        await validations.owns(userId, postId, 'post', db);
      } else {
        await validations.owns(userId, commentId, 'comment', db);
      }

      // YOLO (you only like once)
      const queryParams = {
        userId: userId,
        parentPostId: postId,
        parentCommentId: commentId,
      }
      const like = await db('like').where(queryParams).first();
      if (like) {
        throw new UserInputError("Post/Comment is already liked")
      }

      await db('like').insert({...queryParams, createdAt: new Date()}, ['*']);
      return like;
    },
    unlike: async (_, {userId, postId = null, commentId = null}, {dataSources: {db}}) => {
      validations.hasOneParent(postId, commentId);
      if (postId) {
        await validations.owns(userId, postId, 'post', db);
      } else {
        await validations.owns(userId, commentId, 'comment', db);
      }

      // Check that like exists
      const queryParams = {
        userId: userId,
        parentPostId: postId,
        parentCommentId: commentId,
      }
      const like = await db('like').where(queryParams).first();
      if (!like) {
        throw new UserInputError("Post/Comment has not been liked")
      }

      await db('like').where(queryParams).del();
      return like;
    }
  }
}
