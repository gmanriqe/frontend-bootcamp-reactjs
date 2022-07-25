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
    switch (action.type) {
        case FETCH_FLIGHT_START:
            return { 
                ...state, 
                isLoading: true, 
                data: []
            }
        case FETCH_FLIGHT_COMPLETE:
            return { 
                ...state, 
                isLoading: false, 
                data: action.payload
            }
        case FETCH_FLIGHT_ERROR:
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