/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('user')
  .del()
  .then(() => knex('user').insert([
    {name: 'John Doe'},
    {name: 'Anna'},
    {name: 'Bob'}
  ]));
