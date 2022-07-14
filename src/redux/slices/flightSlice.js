/**
 * SLICE
 */
import { createSlice } from "@reduxjs/toolkit";
// import dayjs from 'dayjs'; // dayjs

export const flightSlice = createSlice(
    {
        name: "flight",
        initialState: {
            list: [],
        },
        reducers: {
            setListFlight(state, action) {
                state.list = action.payload;
            }
        }
    }
)

// setListFlight = Función que nos ayudará a actualizar el resultado de la búsqueda (estado)
export const { setListFlight } = flightSlice.actions;

// flightSlice.reducer = Reducer que debemos luego importarla en nuestra Store
export default flightSlice.reducer;