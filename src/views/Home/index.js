// 1ero: Paquetes de terceros
import { useEffect, useState } from 'react';

// 2do: Paquetes de mi propio proyecto
import Header from "../../components/Header";
import { Banner } from '../../components/Banner';
import { clientCredential } from '../../config/config';
import MainFormSearch from './components/Form';

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
        <main className="main main-home">
            <Header />
            <Banner title='' />
            <section className='pt-lg'>
                <div className='sm:container px-4 pb-10'>
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
        </main>
    )
}

export default Home