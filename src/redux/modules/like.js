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
      console.log("like눌림");
      return state + 1;
    }
    case UNLIKE: {
      console.log("like눌림");
      return state - 1;
    }
    case FETCHLIKE: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default likeReducer;
