// const initialState = {
//   user: null,
//   isLogin: false,
// };

// const users = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_USER":
//       return { ...state, user: action.payload, isLogin: true };
//     case "DELETE_USER":
//       return { state };
//     case "UPDATE_DISPLAYNAME":
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           displayName: action.payload,
//         },
//       };
//     case "UPDATE_PROFILEPIC":
//       return {
//         ...state,
//         user: {
//           ...state.user,
//           photoURL: action.payload,
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default users;
