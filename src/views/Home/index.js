// 1ero: Paquetes de terceros
import { useEffect, useState } from 'react';

// 2do: Paquetes de mi propio proyecto
import { Banner } from '../../components/Banner';
import { formData } from '../../mock/Token';
import MainFormSearch from './components/form';


const Home = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        async function fetchAPISearch() {
            const response = await fetch(`https://test.api.amadeus.com/v1/security/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData)
            });
            const data = await response.json();
            setToken(data.access_token);
        }
        fetchAPISearch();
    }, [])

    const handlePageCovid = () => {
        window.location.href = 'https://www.gob.pe/8736-coronavirus-informacion-para-viajeros';
    }

    return (
        <>
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
        </>
    )
}

export default Home