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
      created_at: new Date(),
      user_id: 1,
      parent_id: 1,
    },
    {
      id: 2,
      content: 'Vestibulum vel commodo lectus, eget imperdiet velit',
      created_at: new Date(new Date().getTime() + 60 * 1000),
      user_id: 3,
      parent_id: 1,
    },
  ]));
