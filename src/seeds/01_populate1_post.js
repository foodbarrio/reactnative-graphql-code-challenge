/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('post')
  .del()
  .then(() => knex('post').insert([
    {
      id: 1,
      title: 'test',
      content: 'Lorem ipsum dolor sit amet',
      created_at: new Date(),
      user_id: 2,
    },
    {
      id: 2,
      title: null,
      content: 'The quick brown fox jumps over the lazy dog 🦊',
      created_at: new Date(),
      user_id: 3,
    },
  ]));
