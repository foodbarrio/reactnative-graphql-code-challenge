const { RESTDataSource } = require("apollo-datasource-rest");

export default class FoodbarrioDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:9000/api/v1";
  }

  async createPost(post) {
    try {
      const createPost = await this.post("/posts", post);
      return createPost;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createComment(comment) {
    try {
      const createComment = await this.post("/comments", comment);
      return createComment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createLike(like) {
    try {
      const createLike = await this.post("/likes", like);
      return createLike;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllPosts() {
    try {
      const posts = await this.get("/posts");
      return posts;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllMyPosts(myId) {
    try {
      const posts = await this.get(`/users/${myId}/posts`);
      return posts;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getCommentStatistics(id) {
    try {
      const statistics = await this.get(`/comments/${id}/statistics`);
      return statistics;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPostStatistics(id) {
    try {
      const statistics = await this.get(`/posts/${id}/statistics`);
      return statistics;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteLike(id) {
    try {
      const like = await this.delete(`/likes/${id}`);
      return like;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getCommentLikes(id) {
    try {
      const likes = await this.get(`/comments/${id}/likes`);
      return likes;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPostLikes(id) {
    try {
      const likes = await this.get(`/posts/${id}/likes`);
      return likes;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updatePost(post) {
    try {
      const { id, ...changes } = post;

      const updatePost = await this.put(`/posts/${id}`, changes);
      return updatePost;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPost(id) {
    try {
      const post = await this.get(`/posts/${id}`);
      return post;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPostComments(id) {
    try {
      const postComments = await this.get(`/posts/${id}/comments`);
      return postComments;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUser(id) {
    try {
      const user = await this.get(`/users/${id}`);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async login(username) {
    try {
      const user = await this.post("/auth/login", { username });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
