const OPEN_LOGIN = "modal/OPEN_LOGIN";
const CLOSE_LOGIN = "modal/CLOSE_LOGIN";

export const openLogin = () => {
  return {
    type: OPEN_LOGIN,
  };
};

export const closeLogin = () => {
  return {
    type: CLOSE_LOGIN,
  };
};

const initialState = {
  isOpen: false,
};

const loginModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN:
      // console.log(state);
      return {
        isOpen: true,
      };
    case CLOSE_LOGIN:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default loginModal;
