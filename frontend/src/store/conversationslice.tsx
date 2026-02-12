import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Message } from '../types/messagetype'


interface conversationtype{
messages:Array<Message>
}
const initialState :conversationtype= {
messages:[]
  
}

const conversationslice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setconversationarray(state,action:PayloadAction< Array<Message>>){


        state.messages=[...state.messages,...action.payload]
    },



    setconversation(state,action:PayloadAction< Message>){
        state.messages=[...state.messages,action.payload]
    },

    clearconverstion(state){

      state.messages=[]
    }
    // Add reducers here if needed in the future






  },



})

export const {setconversation,setconversationarray,clearconverstion}=conversationslice.actions

export default conversationslice.reducer
