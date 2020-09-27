exports.up = function(knex) {
  return knex.schema.createTable("posts", table => {
    // id
    table.increments();

    // author
    table.integer("author").unsigned();
    table
      .foreign("author")
      .references("id")
      .inTable("users");

    // title
    table.string("title");

    // content
    table.string("content");

    // createdAt
    table.dateTime("createdAt");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};

// type Post {
//   id: ID!
//   author: User!
//   title: String
//   content: String
//   createdAt: String!
// }
//
// type Comment {
//   id: ID!
//   parentPost: Post!
//   author: User!
//   content: String
//   createdAt: String!
// }
//
// type Likes {
//   id: ID!
//   parentPost: Post
//   parentComment: Comment
//   author: User!
//   createdAt: String!
// }
