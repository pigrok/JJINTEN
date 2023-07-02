const ADD_POST = "posts/ADD_POST";
const DELETE_POST = "posts/DELETE_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const SET_POSTS = "posts/SET_POSTS";

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

export const updatePost = (id) => ({
  type: UPDATE_POST,
  payload: id,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

const initialState = [];

// 리듀서 함수
const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return [...state, action.payload];
    }

    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload);

    case UPDATE_POST:
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));

    case SET_POSTS:
      return action.payload;

    default:
      return state;
  }
};

export default posts;
