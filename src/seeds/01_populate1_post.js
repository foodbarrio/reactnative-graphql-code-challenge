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
      title: 'Test title',
      content: 'Lorem ipsum dolor sit amet',
      createdAt: new Date(),
      userId: 1,
    },
    {
      id: 2,
      title: null,
      content: 'The quick brown fox\njumps over the lazy dog 🦊',
      createdAt: new Date(),
      userId: 2,
    },
  ]));
