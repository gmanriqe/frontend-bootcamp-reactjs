/**
 * Reducer principal
 */

import { combineReducers } from "@reduxjs/toolkit";

// reducer secundario
import resultsReducer from "./results";

export default combineReducers({
    // debemos llamar a cada reducer secundarios declarados
    results: resultsReducer // results será como tendrá el nombre en el store
})