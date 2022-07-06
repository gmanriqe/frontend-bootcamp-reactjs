import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import Select from 'react-select' // react select
import { useEffect, useState } from 'react';

import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { Banner } from "../../components/Banner";
import { Paises as paises } from "../../mock/Country";


import { formData } from "../../mock/Token";

const Home = () => {
    const [state, setstate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

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
            console.log(data);
        }
        fetchAPISearch();
    }, [])

    const dataFilter = paises.filter((item) => {
        return item.state === '1'
    })

    const optionsDeparture = []
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsDeparture.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const optionsArribal = []
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsArribal.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    return (
        <>
            <Banner title="VUELOS AEREOS" />
            <section className='p-lg'>
                <div className='container mx-auto'>
                    <div className='card p-sm'>
                        <form className='grid grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={() => { alert('hey') }} >
                            <div className='form-group'>
                                <Select className='form-control-select' options={optionsDeparture} />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <Select className='form-control-select' options={optionsArribal} />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <Flatpickr
                                    className='form-control'
                                    value={state}
                                    options={{
                                        enableTime: false,
                                        dateFormat: "l, d M",
                                        locale: Spanish
                                    }}
                                    onChange={(setstate) => console.log(setstate)}
                                />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
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
                            </div>
                            <div className='form-group col-span-2 text-right'>
                                <button className='btn btn-search'>
                                    <span className="material-icons">search</span>
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