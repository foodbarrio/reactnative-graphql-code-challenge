/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = async knex => await knex('comment')
  .del()
  .then(() => knex('comment').insert([
    {
      title: 'test comment',
      content: 'consectetur adipiscing elit',
      createdAt: new Date(new Date().getTime() - 77 * 60 * 1000),
      userId: 1,
      parentId: 1,
    },
    {
      content: 'Vestibulum vel commodo lectus, eget imperdiet velit',
      createdAt: new Date(new Date().getTime() - 60 * 1000),
      userId: 3,
      parentId: 1,
    },
    {
      content: `How much wood would a woodchuck chuck if a woodchuck could chuck wood?\nHe would chuck, he would, as much as he could, and chuck as much wood as a woodchuck would if a woodchuck could chuck wood.`,
      createdAt: new Date(),
      userId: 3,
      parentId: 2,
    },
  ]));
