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
            // setListFlight = Función que nos ayudará a actualizar (estado) el resultado de la búsqueda
            setListFlight(state, action) {
                state.list = action.payload;
            }
        }
    }
)

export const { setListFlight } = flightSlice.actions;
// console.log(flightSlice.actions)
// const { createPost } = flightSlice.actions
// console.log(createPost)

// fetchingFlights deberá ternornar una función
// export const fetchingFlights = (token) => async (dispatch) => {
    // const handleSubmitMainOnlyGoing = async (listVal) => {
    // const dateVal = await dayjs(new Date(listVal.departureDate)).format('YYYY-MM-DD')
    // const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${listVal.originLocationCode.value}&destinationLocationCode=${listVal.destinationLocationCode.value}&departureDate=${dateVal}&adults=${listVal.adults.value}`, {
    // const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=LIM&destinationLocationCode=CUZ&departureDate=2022-07-10&adults=1`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // });
    // const data = await response.json();
    // console.log(data)
    // para poder pasar data dentro de list, debemos hacer uso de los actions ya que son ellos quienes alimentan de dato al reducer
    // await dispatch(setListFlight(data.data));
// }


// flightSlice.reducer es el reducer que debemos luego importarla en nuestra Store
export default flightSlice.reducer;