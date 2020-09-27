const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 9000;
const queries = require("./queries");

app.use(bodyParser.json());

// Posts

// CREATE

app.post("/api/v1/posts", async (request, response) => {
  const post = await queries.createPost({
    ...request.body,
    createdAt: new Date()
  });
  response.send(post);
});

app.post("/api/v1/comments", async (request, response) => {
  const comment = await queries.createComment({
    ...request.body,
    createdAt: new Date()
  });
  response.send(comment);
});

app.delete("/api/v1/likes/:id", async (request, response) => {
  const { id } = request.params;

  const like = await queries.deleteLike(id);
  response.send(like);
});

app.post("/api/v1/likes", async (request, response) => {
  const comment = await queries.createLike({
    ...request.body,
    createdAt: new Date()
  });
  response.send(comment);
});

// RETRIEVE

app.get("/api/v1/posts", async (request, response) => {
  const posts = await queries.getAllPosts();
  response.send(posts);
});

app.get("/api/v1/posts/:id", async (request, response) => {
  const { id } = request.params;

  const post = await queries.getPostById(id);

  if (!post) response.status(404);

  response.send(post);
});

// UPDATE

app.put("/api/v1/posts/:id", async (request, response) => {
  const { id } = request.params;
  const post = await queries.updatePost(id, request.body);
  response.send(post);
});

app.get("/api/v1/posts/:id/comments", async (request, response) => {
  const { id } = request.params;

  const comments = await queries.getPostComments(id);
  response.send(comments);
});

app.get("/api/v1/posts/:id/statistics", async (request, response) => {
  const { id } = request.params;

  const likesCount = await queries.getPostLikesCount(id);
  const commentsCount = await queries.getPostCommentsCount(id);

  response.send({ likesCount, commentsCount });
});

app.get("/api/v1/comments/:id/statistics", async (request, response) => {
  const { id } = request.params;

  const statistics = await queries.getCommentStatistics(id);
  response.send(statistics);
});

app.get("/api/v1/comments/:id/likes", async (request, response) => {
  const { id } = request.params;

  const likes = await queries.getCommentLikes(id);
  response.send(likes);
});

app.get("/api/v1/posts/:id/likes", async (request, response) => {
  const { id } = request.params;

  const likes = await queries.getPostLikes(id);
  response.send(likes);
});

app.get("/api/v1/users/:id", async (request, response) => {
  const { id } = request.params;

  const user = await queries.getUserById(id);

  if (!user) response.status(404);

  response.send(user);
});

app.get("/api/v1/users/:author/posts", async (request, response) => {
  const { author } = request.params;

  const posts = await queries.getAllPostsByAuthor(author);
  response.send(posts);
});

app.post("/api/v1/auth/login", async (request, response) => {
  const { username } = request.body;

  let user = await queries.getUserByUsername(username);

  if (!user) {
    user = await queries.createUser({ username });
  }

  response.send(user);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
