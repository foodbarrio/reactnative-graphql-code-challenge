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
      created_at: new Date(),
      user_id: 1,
      parent_post_id: 1,
    },
    {
      id: 2,
      created_at: new Date(),
      user_id: 1,
      parent_comment_id: 1,
    },
    {
      id: 3,
      created_at: new Date(),
      user_id: 1,
      parent_comment_id: 2,
    },
    {
      id: 4,
      created_at: new Date(),
      user_id: 3,
      parent_comment_id: 2,
    },
  ]));
