/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('comment')
  .del()
  .then(() => knex('comment').insert([
    {
      id: 1,
      title: 'test comment',
      content: 'consectetur adipiscing elit',
      createdAt: new Date(),
      userId: 1,
      parentId: 1,
    },
    {
      id: 2,
      content: 'Vestibulum vel commodo lectus, eget imperdiet velit',
      createdAt: new Date(new Date().getTime() + 60 * 1000),
      userId: 3,
      parentId: 1,
    },
  ]));
