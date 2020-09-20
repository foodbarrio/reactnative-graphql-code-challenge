/**
 * Collection of utility functions
 */

import { POSTS } from './gql/queries';


 /**
 * Because of an Apollo issue, we have to update the cache manually
 * when posts are edited.
 * This extra update is only necessary in detail screen.
 * 
 * @param {*} proxy               The Apollo client
 * @param {string|undefined} id   The query result
 */
export const updatePosts = (proxy, { data }) => {
  const {posts} = proxy.readQuery({ query: POSTS });
  const newPost = data.editPost;
  proxy.writeQuery({
      query: POSTS,
      data: { posts: new Set([newPost, ...posts]) }
  });
}