import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type a = {
  message: string;
  profilepic: string;
  name:string,

};

interface postslicetype {
  showstory: boolean;
  notification: Array<a>;
}
const initialState: postslicetype = {
  showstory: false,
  notification: [],
};

const postslice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setstory(state, action: PayloadAction<boolean>) {
      state.showstory = action.payload;
    },

    setnotification(state, action: PayloadAction<{ data: a }>) {
      state.notification = [...(state.notification || []), action.payload.data];
    },


    // Add reducers here if needed in the future
  },
});

export const { setstory, setnotification } = postslice.actions;

export default postslice.reducer;
