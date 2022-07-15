/**
 * Reducer secundario
 */

import {
    FETCH_FLIGHT_START,
    FETCH_FLIGHT_COMPLETE,
    FETCH_FLIGHT_ERROR
} from '../actions/results'

const initialState = {
    isLoading: false,
    data: [],
    error: {}
}

const resultsReducer = (state = initialState, action) => {
    // console.log('resultsReducer', action)
    switch (action.type) {
        case FETCH_FLIGHT_START:
            // console.log({...state, isLoading: true, data: []})
            return { 
                ...state, 
                isLoading: true, 
                data: []
            }
        case FETCH_FLIGHT_COMPLETE:
            // console.log({...state, isLoading: false, data: action.payload})
            return { 
                ...state, 
                isLoading: false, 
                data: action.payload
            }
        case FETCH_FLIGHT_ERROR:
            // console.log({...state, isLoading: false, error: action.error})
            return { 
                ...state, 
                isLoading: false, 
                error: action.error
            }
        default:
            return state;
    }
}

// Se recomienda tener un reducer por archivo. Luego debemos importar dentro del reducer principal "index.js"
export default resultsReducer