/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('like')
  .del()
  .then(() => knex('like').insert([
    {
      id: 1,
      createdAt: new Date(),
      userId: 1,
      parentPostId: 1,
    },
    {
      id: 2,
      createdAt: new Date(),
      userId: 1,
      parentCommentId: 1,
    },
    {
      id: 3,
      createdAt: new Date(),
      userId: 1,
      parentCommentId: 2,
    },
    {
      id: 4,
      createdAt: new Date(),
      userId: 3,
      parentCommentId: 2,
    },
    {
      id: 5,
      createdAt: new Date(),
      userId: 3,
      parentPostId: 1,
    },
  ]));
