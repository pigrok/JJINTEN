import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
// import users from "../modules/users.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../modules/auth";
import todos from "../modules/todos";
import comments from "../modules/comments";
import likeReducer from "../modules/like";
import thunk from "redux-thunk";

// Redux Persist 구성
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // 여기에 modules
  auth: authReducer,
  todos: todos,
  comments: comments,
  like: likeReducer,
});

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store 생성
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };
