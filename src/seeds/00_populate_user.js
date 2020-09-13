/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('user')
  .del()
  .then(() => knex('user').insert([
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Anna'},
    {id: 3, name: 'Bob'}
  ]));
