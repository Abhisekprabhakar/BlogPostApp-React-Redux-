import { types } from "../Actions/BlogAction";
export default function blogReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_BLOG: {
      return { blogs: [...state.blogs, { ...action.blog }] };
    }

    case types.UPDATE_BLOG: {
      let newState = state.blogs.map((blog) =>
        blog.id === action.blog.id ? action.blog : blog
      );
      return { blogs: [...newState] };
    }
    case types.BLOG_LIKE_BY_ID: {
      let newState = state;
      const blogIndex = newState.blogs.findIndex(
        (b) => b.id === Number(action.Id)
      );
      if (blogIndex > -1) {
        newState.blogs[blogIndex].users.push(action.userId);
      }
      return newState;
    }
    case types.BLOG_UNLIKE_BY_ID: {
      let newState = state;
      const blogIndex = newState.blogs.findIndex(
        (b) => b.id === Number(action.Id)
      );
      if (blogIndex > -1) {
        const index = newState.blogs[blogIndex].users.indexOf(action.userId);
        if (index > -1) {
          newState.blogs[blogIndex].users.splice(index, 1);
        }
      }
      return newState;
    }
    case types.BLOG_DELETE_BY_ID: {
      return {
        blogs: [...state.blogs.filter((b) => b.id !== Number(action.Id))],
      };
    }

    default:
      return state;
  }
}
