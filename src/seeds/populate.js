/**
 * Seed to add some sham data to db.
 * 
 * @param {*} knex 
 */

exports.seed = knex => knex('user')
  .del()
  .then(() => knex('user').insert([
    {id: 1, name: 'pippo'},
    {id: 2, name: 'pluto'},
    {id: 3, name: 'paperino'}
  ]));
