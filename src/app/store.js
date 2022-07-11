import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../redux/slices/flightSlice";

// store = lugar donde será almacenado los datos de la aplicación
// slide = es una parte de un estado
export const store = configureStore({
    flight: flightReducer,
    reducer: {
        // ... your reducer (un reducer es la tipica funcion que actualiza un estado, tipo el setState de un componente)
    }
})
