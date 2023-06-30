import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
// import users from "../modules/users.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../modules/auth";
import posts from "../modules/posts";
import comments from "../modules/comments";
// import thunk from "redux-thunk";

// Redux Persist 구성
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // 여기에 modules
  auth: authReducer,
  posts,
  comments,
});

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default store;
// Redux Store 생성
const store = createStore(persistedReducer);
const persistor = persistStore(store);

// const store = createStore(rootReducer);

export { store, persistor };
