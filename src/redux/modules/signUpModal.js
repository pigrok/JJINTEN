const OPEN_SIGNUP = "modal/OPEN_SIGNUP";
const CLOSE_SIGNUP = "modal/CLOSE_SIGNUP";

export const openSignUp = () => {
  return {
    type: OPEN_SIGNUP,
  };
};

export const closeSignUp = () => {
  return {
    type: CLOSE_SIGNUP,
  };
};

const initialState = {
  isOpen: false,
};

const signUpModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIGNUP:
      return {
        isOpen: true,
      };
    case CLOSE_SIGNUP:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default signUpModal;
