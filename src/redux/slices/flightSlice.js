/**
 * SLICE
 */
import { createSlice } from "@reduxjs/toolkit";

export const flightSlice = createSlice(
    {
        name: "flight",
        initialState: {
            list: [],
        },
        reducers: {
            createPost(state, action) { }
        }
    }
)
// console.log(flightSlice.actions)
// const { createPost } = flightSlice.actions
// console.log(createPost)




// flightSlice.reducer es el reducer que debemos luego importarla en nuestra Store
export default flightSlice.reducer;