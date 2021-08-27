export const types = {
  CREATE_BLOG: "CREATE_BLOG",
  UPDATE_BLOG: "UPDATE_BLOG",
  BLOG_UNLIKE_BY_ID: "BLOG_UNLIKE_BY_ID",
  BLOG_LIKE_BY_ID: "BLOG_LIKE_BY_ID",
  BLOG_DELETE_BY_ID: "BLOG_DELETE_BY_ID",
};

export function CreateBlog(blog) {
  return { type: types.CREATE_BLOG, blog };
}

export function UpdateBlog(blog) {
  return { type: types.UPDATE_BLOG, blog };
}
export function BlogLikeByID(Id, userId) {
  return { type: types.BLOG_LIKE_BY_ID, Id, userId };
}

export function BlogUnLikeByID(Id, userId) {
  return { type: types.BLOG_UNLIKE_BY_ID, Id, userId };
}

export function BlogDeleteByID(Id) {
  return { type: types.BLOG_DELETE_BY_ID, Id };
}
