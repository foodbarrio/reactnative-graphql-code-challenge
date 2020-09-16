const {AuthenticationError, UserInputError, ForbiddenError} = require("apollo-server");



module.exports = {
  isUser: async (id, db) => {
    const user = await db('user').where({id}).first();
    if (!user) {
      throw new AuthenticationError('User id not found');
    }
  },

  exists: async (entityId, entityType, db) => {
    const entityTypes = ['post', 'comment', 'like'];
    if (!entityTypes.includes(entityType)) {
      throw new UserInputError(`Parameter 'entityType' unknown: ${entityType}`);
    }
    const record = await db(entityType).where({id: entityId}).first();
    if (!record) {
      throw new UserInputError(`${entityType} id not found`);
    }
  },

  owns: async function(userId, entityId, entityType, db) {
    await this.isUser(userId, db);
    await this.exists(entityId, entityType, db);

    const record = await db(entityType).where({id: entityId, userId: userId}).first();
    if (!record) {
      throw new ForbiddenError(`User [${userId}] doesn\'t own ${entityType} [${entityId}]`);
    }
  },

  hasOneParent: (userId, commentId) => {
    if (!userId && !commentId) {
      throw new UserInputError(`One of userId and commentId must be set`);
    }
    if (userId && commentId) {
      throw new UserInputError(`Either userId and commentId must be set, but not both`);
    }
  },
}
