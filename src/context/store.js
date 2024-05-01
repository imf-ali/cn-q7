import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album";

const store = configureStore({
  reducer: {
    albumReducer,
  }
});

export default store;