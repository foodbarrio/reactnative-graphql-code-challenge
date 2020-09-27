const connection = require("./knexfile")[process.env.NODE_ENV || "development"];
const database = require("knex")(connection);

module.exports = {
  getPostLikesCount(parentPost) {
    return database("likes")
      .where({ parentPost })
      .count()
      .returning("count")
      .then(function(results) {
        return results[0].count;
      });
  },
  getPostCommentsCount(parentPost) {
    return database("comments")
      .where({ parentPost })
      .count()
      .returning("count")
      .then(function(results) {
        return results[0].count;
      });
  },
  deleteLike(id) {
    return database("likes")
      .del()
      .where({
        id
      })
      .returning("*")
      .then(function(results) {
        return results[0];
      });
  },
  createPost(post) {
    return database("posts")
      .insert(post)
      .returning("*")
      .then(function(results) {
        return results[0];
      });
  },
  createComment(comment) {
    return database("comments")
      .insert(comment)
      .returning("*")
      .then(function(results) {
        return results[0];
      });
  },
  createLike(like) {
    return database("likes")
      .insert(like)
      .returning("*")
      .then(function(results) {
        return results[0];
      });
  },
  getAllPosts() {
    return database("posts");
  },
  getAllPostsByAuthor(author) {
    return database("posts").where({ author });
  },
  getPostById(id) {
    return database("posts")
      .where({ id })
      .first();
  },
  getPostComments(id) {
    return database("comments").where({ parentPost: id });
  },
  updatePost(id, changes) {
    return database("posts")
      .where({ id })
      .update(changes)
      .returning("*")
      .then(function(results) {
        return results[0];
      });
  },
  getCommentStatistics(parentComment) {
    return database("likes")
      .where({ parentComment })
      .count()
      .returning("count")
      .then(function(results) {
        return results[0].count;
      });
  },
  getCommentLikes(parentComment) {
    return database("likes").where({ parentComment });
  },
  getPostLikes(parentPost) {
    return database("likes").where({ parentPost });
  },
  getUserById(id) {
    return database("users")
      .where({ id })
      .first();
  },
  getUserByUsername(username) {
    return database("users")
      .where({ username })
      .first();
  },
  createUser(user) {
    return database("users")
      .insert(user)
      .returning("id")
      .then(function(results) {
        return { id: results[0], ...user };
      });
  }
};
