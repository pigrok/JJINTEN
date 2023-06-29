import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ADD_COMMENT = "comments/ADD_COMMENT";
const SET_COMMENTS = "comments/SET_COMMENTS";

export const addComments = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});

// export const fetchComments = (id) => {
//   return async (dispatch) => {
//     try {
//       const q = await query(collection(db, "comments"), where("postId", "==", id));
//       const querySnapshot = await getDocs(q);
//       const comments = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return { ...data };
//       });
//       console.log(comments);
//       dispatch(setComments(comments));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

const initialState = [];

// 리듀서
// action => type, payload
const comments = (state = initialState, action) => {
  // 액션을 지정
  switch (action.type) {
    case ADD_COMMENT: {
      console.log("addComment :44라인 ", state, action.payload);
      return [...state, action.payload];
    }

    // case "DELETE_COMMENT":
    //   return state.filter((comment) => comment.id !== action.payload);

    case SET_COMMENTS:
      return action.payload;

    default:
      return state;
  }
};

export default comments;
