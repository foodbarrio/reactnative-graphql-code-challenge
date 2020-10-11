export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Home: undefined;
  Post: undefined;
  CreatePost: undefined;
};

export type Author = {
  id: string;
  username: string;
};

export type Comment = {
  author: Author;
  id: string;
  content: string;
  createdAt: string;
  likes: Like[];
};

export type Like = {
  comment: Comment | null;
  post: Post | null;
  author: Author;
};

export type Post = {
  id: string;
  author: Author;
  content: string;
  comments: Comment[];
  title: string;
  likes: Like[];
  createdAt: string;
};

export interface AuthPayload {
  token: string;
  user: {
    id: string;
  };
}
