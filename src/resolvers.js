/**
 * Query resolvers
 */

module.exports = {
  Query: {
    users: async (_, __, {dataSources: {db}}) => await db('user'),
    posts: async (_, __, {dataSources: {db}}) => await db('post'),
    post: async (_, {parentId}, {dataSources: {db}}) => await db('post').where({parentId}),
    comments: async (_, __, {dataSources: {db}}) => await db('comment'),
  }
}
