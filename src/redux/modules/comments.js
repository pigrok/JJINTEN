const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const SET_COMMENTS = "comments/SET_COMMENTS";

export const addComments = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});

export const updateComment = (updatedComment) => ({
  type: UPDATE_COMMENT,
  payload: updatedComment,
});

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});

const initialState = [];

// 리듀서
// action => type, payload
const comments = (state = initialState, action) => {
  // 액션을 지정
  switch (action.type) {
    case ADD_COMMENT: {
      return [...state, action.payload];
    }

    case DELETE_COMMENT:
      const commentId = action.payload;
      return state.filter((comment) => comment.id !== commentId);

    case UPDATE_COMMENT: {
      const afterProcess = state.map((comment) => (comment.id === action.payload.id ? action.payload : comment));
      console.log("바꾼후: " + afterProcess);
      return afterProcess;
    }

    case SET_COMMENTS:
      return action.payload;

    default:
      return state;
  }
};

export default comments;
