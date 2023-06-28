import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const SIGNUP_SUCCESS = "auth/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "auth/SIGNUP_FAILURE";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const signUp = (email, password) => {
  try {
    const userCredential = createUserWithEmailAndPassword(auth, email, password);
    return {
      type: SIGNUP_SUCCESS,
      payload: userCredential.user,
    };
  } catch (error) {
    return {
      type: SIGNUP_FAILURE,
      payload: error.message,
    };
  }
};

export const login = (email, password) => {
  try {
    const userCredential = signInWithEmailAndPassword(auth, email, password);
    return {
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    };
  } catch (error) {
    return {
      type: LOGIN_FAILURE,
      payload: error.message,
    };
  }
};

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
