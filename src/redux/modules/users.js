const initialState = {
  user: null,
  name: null,
  isLogin: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: action.payload, isLogin: true };
    default:
      return state;
  }
};

export default users;
