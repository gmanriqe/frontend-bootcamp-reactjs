// 1ero: Paquetes de terceros
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router'

// 2do: Paquetes de mi propio proyecto
import { Banner } from '../../components/Banner';
import { formData } from '../../mock/Token';
import MainFormSearch from './components/form';


const Home = () => {
    // const navigate = useNavigate()
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

    /*
    const handleSubmitMainGoingAndReturn = async (listVal) => {
        const dateVal1 = dayjs(new Date(listVal.departureDate)).format('YYYY-MM-DD')
        const dateVal2 = dayjs(new Date(listVal.arrivalDate)).format('YYYY-MM-DD')
        const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${listVal.originLocationCode.value}&destinationLocationCode=${listVal.destinationLocationCode.value}&departureDate=${dateVal1}&returnDate=${dateVal2}&adults=${listVal.adults.value}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        localStorage.setItem('search', JSON.stringify(data))

        navigate(`/results`)
    }
    */

    return (
        <>
            <Banner title='' />
            <section className='pt-lg'>
                <div className='container mx-auto'>
                    <div className='search-flight container-small'>
                        <h2 className="text-center">VUELOS</h2>
                        <div className='card p-sm'>
                            <MainFormSearch token={token}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home