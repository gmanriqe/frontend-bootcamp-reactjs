/**
 * Actions (disparadores)
 * 1era acción: cargando
 * 2do acción: si hay un error
 * 3era acción: si termino y tiene la data
 */

// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs'; 

// Todos los valores: FETCH_FLIGHT_START, FETCH_FLIGHT_COMPLETE y FETCH_FLIGHT_ERROR serán evaluados en el reducer correspondiente (reducers/results.js)
export const FETCH_FLIGHT_START = 'FETCH_FLIGHT_START'
export const FETCH_FLIGHT_COMPLETE = 'FETCH_FLIGHT_COMPLETE'
export const FETCH_FLIGHT_ERROR = 'FETCH_FLIGHT_ERROR'

export const fetchFlightStart = () => ({ // fetchFlightStart = acción que dispara el fetching dentro del componente que quieras utilizarlo
    type: FETCH_FLIGHT_START
})

// debemos obtener los datos obtenidos del fetching, donde payload es la data
export const fetchFlightComplete = (payload) => ({
    type: FETCH_FLIGHT_COMPLETE,
    payload // action.payload
})

export const fetchFlightError = (error) => ({
    type: FETCH_FLIGHT_ERROR,
    error
})

// Me genera error al importarlo desde el onSubmit del Formik
/*
export const fecthFlightDetail = (valores, token) => (dispatch) => {
    const navigate = useNavigate()

    dispatch(fetchFlightStart())
    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
    const myRequest = fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&adults=${valores.adults.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    myRequest
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            // dispatch(setListFlight(data.data))
            dispatch(fetchFlightComplete(data.data))
            navigate(`/results`)
        })
        .catch(function (error) {
            fetchFlightError(error)
        })
        .finally(() => console.log('finally'));
}
*/
