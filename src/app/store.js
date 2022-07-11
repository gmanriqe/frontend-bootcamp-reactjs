import { configureStore } from "@reduxjs/toolkit";

// store = lugar donde será almacenado los datos de la aplicación
// slide = es una parte de un estado
export const store = configureStore({
    reducer: {
        // ... your reducer (un reducer es la tipica funcion que actualiza un estado, tipo el setState de un componente)
    }
})
