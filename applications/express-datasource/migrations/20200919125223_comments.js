exports.up = function(knex) {
  return knex.schema.createTable("comments", table => {
    // id
    table.increments();

    // author
    table.integer("author").unsigned();
    table
      .foreign("author")
      .references("id")
      .inTable("users");

    // parentPost
    table.integer("parentPost").unsigned();
    table
      .foreign("parentPost")
      .references("id")
      .inTable("posts");

    // content
    table.string("content");

    // createdAt
    table.dateTime("createdAt");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments");
};

// type Comment {
//   id: ID!
//   parentPost: Post!
//   author: User!
//   content: String
//   createdAt: String!
// }
