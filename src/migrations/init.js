/**
 * Build db tables from scratch using the specified schema.
 * 
 * @param {*} knex
 */

exports.up = knex => knex.schema
  .createTable('user', t => {
    t.increments('id').primary();
    t.string('name').notNullable();
  })

  .createTable('post', t => {
    t.increments('id').primary();
    t.string('title');
    t.text('content', 65536).notNullable();
    t.timestamp('createdAt', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

  .createTable('comment', t => {
    t.increments('id').primary();
    t.string('title');
    t.text('content', 65536).notNullable();
    t.timestamp('createdAt', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('parentId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

  .createTable('like', t => {
    t.increments('id').primary();
    t.timestamp('createdAt', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('parentPostId')
      .unsigned()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('parentCommentId')
      .unsigned()
      .references('id')
      .inTable('comment')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

exports.down = knex => knex.schema
  .dropTableIfExists('like')
  .dropTableIfExists('comment')
  .dropTableIfExists('post')
  .dropTableIfExists('user')
