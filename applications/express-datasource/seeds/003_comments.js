exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        {
          id: 1,
          author: 1,
          parentPost: 1,
          content: "bla bla",
          createdAt: new Date()
        }
      ]);
    });
};
