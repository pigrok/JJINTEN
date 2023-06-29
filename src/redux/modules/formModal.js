const OPEN_FROM = "modal/OPEN_FROM";
const CLOSE_FROM = "modal/CLOSE_FROM";

export const openForm = () => {
  return {
    type: OPEN_FROM,
  };
};

export const closeForm = () => {
  return {
    type: CLOSE_FROM,
  };
};

const initialState = {
  isOpen: false,
};

const formModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FROM:
      return {
        isOpen: true,
      };
    case CLOSE_FROM:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default formModal;
