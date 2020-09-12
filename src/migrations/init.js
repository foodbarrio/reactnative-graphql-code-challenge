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
    t.timestamp('created_at', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('user_id')
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
    t.timestamp('created_at', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('parent_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

  .createTable('like', t => {
    t.increments('id').primary();
    t.timestamp('created_at', {useTz: true}).notNullable();
    // Foreign keys
    t.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('parent_post_id')
      .unsigned()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('parent_comment_id')
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
