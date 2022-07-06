import 'flatpickr/dist/themes/material_green.css';
import dayjs from 'dayjs'; // dayjs

import Flatpickr from 'react-flatpickr'; // flatpickr
import Select from 'react-select' // react select
import { useEffect, useState } from 'react';

import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { Banner } from '../../components/Banner';
import { Paises as paises } from '../../mock/Country';

import { formData } from '../../mock/Token';

dayjs.locale('es')

const Home = () => {
    const [departureDate, setDepartureDate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [token, setToken] = useState(null);

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

    // if(token != null) 

    const dataFilter = paises.filter((item) => {
        return item.state === '1'
    })

    const optionsArribal = []
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsArribal.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const optionsDeparture = []
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsDeparture.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const handlerSubmitMainSearch = async (evt) => {
        evt.preventDefault();

        const { originLocationCode, destinationLocationCode } = evt.currentTarget
        const dateVal = dayjs(new Date(departureDate)).format('YYYY-MM-DD')

        const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode.value}&destinationLocationCode=${destinationLocationCode.value}&departureDate=${dateVal}&adults=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data)
    }

    return (
        <>
            <Banner title='VUELOS AEREOS' />
            <section className='p-lg'>
                <div className='container mx-auto'>
                    <div className='card p-sm'>
                        <form className='grid grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={handlerSubmitMainSearch} >
                            <div className='form-group'>
                                <Select className='form-control-select' options={optionsDeparture} name='originLocationCode' />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <Select className='form-control-select' options={optionsArribal} name='destinationLocationCode' />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <Flatpickr
                                    className='form-control'
                                    name='departureDate'
                                    value={departureDate}
                                    options={{
                                        enableTime: false,
                                        dateFormat: 'l, d M',
                                        locale: Spanish
                                    }}
                                    onChange={(val) => (setDepartureDate(val))}
                                />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            {/* <div className='form-group'>
                                <Flatpickr
                                    className='form-control'
                                    value={dateEnd}
                                    options={{
                                        enableTime: false,
                                        dateFormat: "l, d M",
                                        locale: Spanish
                                    }}
                                    onChange={(setDateEnd) => console.log(setDateEnd)}
                                />
                                <span className='message-error'>Campo obligatorio</span>
                            </div> */}
                            <div className='form-group col-span-2 text-right'>
                                <button className='btn btn-search'>
                                    <span className='material-icons'>search</span>
                                    <strong>Buscar</strong>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home