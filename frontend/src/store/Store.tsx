import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Userslice";
import postReducer from "./postslice";
import socketReducer from "./socketslice";
import conversationReducer from "./conversationslice";
import { userApi } from "./userapi";
import { postapi } from "./postapi";
import { conversationapi } from "./conversationapi";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "post", "conversation"], // Persist user slice
  // Don't persist these reducers
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  conversation: conversationReducer,
  socket: socketReducer,
  [conversationapi.reducerPath]: conversationapi.reducer,

  [userApi.reducerPath]: userApi.reducer,
  [postapi.reducerPath]: postapi.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      userApi.middleware,
      postapi.middleware,
      conversationapi.middleware,
    ),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
