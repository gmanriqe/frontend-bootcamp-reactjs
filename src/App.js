// 1ero: Paquetes de terceros
import RoutesComponent from './routes/index';
import { useSelector } from 'react-redux';

// 2do: Paquetes de mi propio proyecto

function App() {
    const stateFlight = useSelector(state => state.flight);
    console.log(stateFlight)

    return (
        <div className='App'>
            <RoutesComponent />
        </div>
    );
}

export default App;
