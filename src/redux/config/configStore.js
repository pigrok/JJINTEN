import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
// import users from "../modules/users.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../modules/auth";
import loginModal from "../modules/loginModal";
import signUpModal from "../modules/signUpModal";
import users from "../modules/users.js";
import todos from "../modules/todos";
import comments from "../modules/comments";
import thunk from "redux-thunk";

// Redux Persist 구성
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // users,
  // 여기에 modules
  auth: authReducer,
  loginModal: loginModal,
  signUpModal: signUpModal,
  users: users,
  todos: todos,
  comments: comments,
});
// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default store;
// Redux Store 생성
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };
