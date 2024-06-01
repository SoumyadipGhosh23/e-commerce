import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";
import authSlice from "./authSlice";
import wishList from "./wishList";
import amountSlice from "./amountSlice";
import chatbotslice from "./chatbotslice";
import filteringSlice from "./filteringSlice";
import allProducts from "./allProducts";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const orebiPersistedReducer = persistReducer(persistConfig, orebiReducer);


// Combine reducers
const rootReducer = combineReducers({
  orebiReducer: orebiPersistedReducer,
  auth: authSlice,
  wishlist : wishList,
  amountpay : amountSlice,
  chatbotslice : chatbotslice,
  filteringSlice : filteringSlice,
  allProducts : allProducts
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
