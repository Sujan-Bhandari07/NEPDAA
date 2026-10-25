import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  connected: boolean;
  onlineusers: Array<string>;
}

const initialState: SocketState = {
  connected: false,
  onlineusers: [],
};

const socketslice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setsocketconnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },

    setonlineusers(state, action: PayloadAction<Array<string>>) {
      state.onlineusers = action.payload;
    },
  },
});

export const { setsocketconnected, setonlineusers } = socketslice.actions;

export default socketslice.reducer;
