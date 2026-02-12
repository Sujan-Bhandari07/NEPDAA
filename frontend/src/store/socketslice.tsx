import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Socket } from "socket.io-client";
import { castDraft } from "immer";

interface sockettype {
  socket: null | Socket;
  onlineusers: Array<string>;
}
const initialState: sockettype = {
  socket: null,
  onlineusers: [],
};

const socketslice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setsocket(state, action: PayloadAction<{ id: Socket | null }>) {
      state.socket = castDraft(action.payload.id);
    },

    setonlineusers(state, action: PayloadAction<Array<string>>) {
      state.onlineusers = action.payload;
    },
    // Add reducers here if needed in the future
  },
});

export const { setsocket, setonlineusers } = socketslice.actions;

export default socketslice.reducer;
