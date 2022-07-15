// 1ero: Paquetes de terceros
import { useEffect, useState } from 'react';

// 2do: Paquetes de mi propio proyecto
import { clientCredential } from '../../config/config';
import { Banner } from '../../components/Banner';
import MainFormSearch from './components/form';

const Home = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        function APIShowToken() {
            const myRequest = fetch(`https://test.api.amadeus.com/v1/security/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(clientCredential)
            });
            myRequest
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(function (data) {
                    setToken(data.access_token);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        APIShowToken();
    }, [])

    return (
        <div className="main main-home">
            <Banner title='' />
            <section className='pt-lg'>
                <div className='container mx-auto'>
                    <div className='search-flight container-small'>
                        <h2 className="text-center">VUELOS</h2>
                        <div className='card p-sm'>
                            <MainFormSearch token={token} />
                        </div>
                        <div className='card-message p-sm my-8'>
                            <span className='material-icons card-message__icon'>info</span>
                            <div>
                                <h5>Aviso de viaje activo</h5>
                                <p className='card-message__text'>Hay una recomendación de viaje del Gobierno relacionada con el coronavirus (COVID‑19).
                                    <a href='https://www.gob.pe/8736-coronavirus-informacion-para-viajeros' target='_blank' rel="noreferrer" className='card-message__link'> Más detalles</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home