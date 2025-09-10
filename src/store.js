import { configureStore } from "@reduxjs/toolkit";
import adoptedPetReducer from "./adoptedPetSlice";
import searchParamsReducer from "./searchParamsSlice";

export const store = configureStore({
  reducer: {
    adopt: adoptedPetReducer,
    search: searchParamsReducer,
  },
  preloadedState: {},
});
