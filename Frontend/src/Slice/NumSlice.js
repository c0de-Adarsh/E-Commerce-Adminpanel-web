import { createSlice } from "@reduxjs/toolkit";

const numSlice = createSlice({
    name:'num',
    initialState:{
        value:0
    },
    reducers:{
        numIncr:(state)=>{
            state.value += 1;
        },
        numDecr:(state)=>{
            state.value -=1;
        }
    }
})

export const {numIncr,numDecr} = numSlice.actions
export default numSlice.reducer