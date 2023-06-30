const LIKE = "like/LIKE";
const UNLIKE = "like/UNLIKE";
const FETCHLIKE = "like/FETCHLIKE";

export const like = () => ({ type: LIKE });
export const fetchLike = (like) => ({ type: FETCHLIKE, payload: like });
export const unlike = () => ({ type: UNLIKE });

const initialState = 0;

// 리듀서 함수
const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE: {
      return state + 1;
    }
    case UNLIKE:
      return state - 1;
    case FETCHLIKE: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default likeReducer;
