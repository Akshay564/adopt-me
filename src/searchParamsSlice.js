import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    location: "",
    animal: "",
    breed: "",
  },
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
