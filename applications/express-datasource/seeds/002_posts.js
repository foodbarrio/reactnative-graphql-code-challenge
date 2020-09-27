exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("posts").insert([
        {
          id: 1,
          title: "Harry Potter and the Chamber of Secrets",
          content: "bla bla",
          author: 1,
          createdAt: new Date()
        },
        {
          id: 2,
          title: "Jurassic Park",
          content: "bla bla",
          author: 2,
          createdAt: new Date()
        }
      ]);
    });
};
