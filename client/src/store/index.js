import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  authSlice: authReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authSlice"],
};
// store in persist reducer
const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
