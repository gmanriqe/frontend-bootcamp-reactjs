/**
 * Store & Reducer
 */
import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../redux/slices/flightSlice";

export const store = configureStore({
    reducer: {
        flight: flightReducer,
        // ... your reducer (un reducer es la tipica funcion que actualiza un estado, tipo el setState de un componente)
    }
})

/**
 * Terminos en Redux Toolkit
 */
// store = lugar donde será almacenado los datos de la aplicación y seran accedidos desde cualquier parte de la aplicación
// slide = es una parte de un estado
// useDispatch = función que vamos a usar para ...
// useSelector = función que vamos a usar para obtener el estado