/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('post')
  .del()
  .then(() => knex('post').insert([
    {
      title: 'Test title',
      content: 'Lorem ipsum dolor sit amet',
      createdAt: new Date(new Date().getTime() - 15000000),
      userId: 1,
    },
    {
      title: null,
      content: 'The quick brown fox\njumps over the lazy dog 🦊',
      createdAt: new Date(new Date().getTime() - 7000000),
      userId: 2,
    },
  ]));
