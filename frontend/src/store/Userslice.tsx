import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { usertype } from '../types/loginpagetypes'

interface userslicetype{
    user:usertype | null,
    isauth:boolean,
    search:string,
    emails:string|null
    selecteduser:usertype |null
}
const initialState :userslicetype= {
  user: null,
  emails:null,

  isauth:false,
search : "",
selecteduser:null
  
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser(state,action:PayloadAction<usertype | null>){
        state.user= action.payload
        state.emails=action.payload?.email ?? null
    },

    setemail(state, action: PayloadAction<string | null>) {
      state.emails = action.payload
    },

    setselecteduser(state,action:PayloadAction<usertype |null>){

      state.selecteduser=action.payload
    },
    // Add reducers here if needed in the future


    setsearch(state,action:PayloadAction<string>){
      state.search=action.payload
    },





setisauth(state,action:PayloadAction<boolean>){

  state.isauth=action.payload
}

  },





})

export const {setuser,setemail,setisauth,setsearch,setselecteduser}=userSlice.actions

export default userSlice.reducer
