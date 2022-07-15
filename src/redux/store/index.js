/**
 * Store
 */
import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers"; // reducer principal

// configuración de mi store
export default configureStore({
    // ... your reducer (un reducer es la tipica "funcion" que actualiza un estado, tipo el setState de un componente)
    reducer: reducers,
})

/**
 * Terminos en Redux Toolkit
 */
// store = lugar donde será almacenado los datos de la aplicación y seran accedidos desde cualquier parte de la aplicación
// slide = es una parte de un estado
// useDispatch = función que vamos a usar para ...
// useSelector = función que vamos a usar para obtener el estado