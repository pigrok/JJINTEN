import { createStore } from "redux";
import { combineReducers } from "redux";
import users from "../modules/users.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist 구성
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  users,
});

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default store;

// Redux Store 생성
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
