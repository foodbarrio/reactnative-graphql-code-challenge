/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = async knex => await knex('like')
  .del()
  .then(() => knex('like').insert([
    {
      createdAt: new Date(),
      userId: 1,
      parentPostId: 1,
    },
    {
      createdAt: new Date(),
      userId: 1,
      parentCommentId: 1,
    },
    {
      createdAt: new Date(),
      userId: 1,
      parentCommentId: 2,
    },
    {
      createdAt: new Date(),
      userId: 3,
      parentCommentId: 2,
    },
    {
      createdAt: new Date(),
      userId: 3,
      parentPostId: 1,
    },
  ]));
