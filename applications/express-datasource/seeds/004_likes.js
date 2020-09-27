exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("likes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("likes").insert([
        {
          id: 1,
          author: 2,
          parentPost: 1,
          createdAt: new Date()
        },
        {
          id: 2,
          author: 2,
          parentComment: 1,
          createdAt: new Date()
        }
      ]);
    });
};
