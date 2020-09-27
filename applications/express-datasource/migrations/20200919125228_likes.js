exports.up = function(knex) {
  return knex.schema.createTable("likes", table => {
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

    // parentComment
    table.integer("parentComment").unsigned();
    table
      .foreign("parentComment")
      .references("id")
      .inTable("comments");

    // createdAt
    table.dateTime("createdAt");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("likes");
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
