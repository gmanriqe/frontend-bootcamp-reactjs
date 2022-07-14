// 1ero: Paquetes de terceros
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 2do: Paquetes de mi propio proyecto
import Home from '../views/Home';
import Results from '../views/Results';
import Detail from '../views/Detail';
import Page404 from '../views/Page404';

// recuerda este componente no tiene llaves, directo con parentesis
const RoutesComponent = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/page-404" element={<Page404 />} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    </BrowserRouter>
)

export default RoutesComponent;