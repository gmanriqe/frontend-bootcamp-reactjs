// 1ero: Paquetes de terceros
import 'flatpickr/dist/themes/material_green.css';
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'; // flatpickr
import dayjs from 'dayjs'; // dayjs
import { useEffect, useState } from 'react';
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { useNavigate } from 'react-router'

// 2do: Paquetes de mi propio proyecto
import { Banner } from '../../components/Banner';
import { Paises as paises } from '../../mock/Country';
import { formData } from '../../mock/Token';

dayjs.locale('es')

const Home = () => {
    const navigate = useNavigate()

    const [departureDate, setDepartureDate] = useState(new Date());
    const [arrivalDate, setArrivalDate] = useState(new Date());
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

    const optionsDeparture = []
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsDeparture.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const optionsArribal = [{
        value: '',
        label: 'SELECCIONE...',
        isDisabled: true
    }]
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsArribal.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const numberPassengersAdult = []
    for (let i = 1; i < 10; i++) {
        numberPassengersAdult.push({
            value: i,
            label: i
        })
    }

    const numberPassengersBaby = [{
        value: '',
        label: 'SELECCIONE...',
        isDisabled: true
    }]
    for (let i = 1; i < 10; i++) {
        numberPassengersBaby.push({
            value: i,
            label: i
        })
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
        localStorage.setItem('search', JSON.stringify(data))

        // navegar a la sgte. vista
        navigate(`/results`)
    }

    return (
        <>
            <Banner title='' />
            <section className='pt-lg'>
                <div className='container mx-auto'>
                    <div className='search-flight'>
                        <h2 className="text-center">VUELOS</h2>
                        <div className='card p-sm'>
                            <form className='grid grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={handlerSubmitMainSearch} >
                                <div className='form-group'>
                                    <label className='form-label'>¿Desde dónde? *</label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={{ value: 'LIM', label: 'Peru - Jorge Chávez International Airport' }}
                                        options={optionsDeparture}
                                        name='originLocationCode' />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>¿A dónde quiere ir? *</label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={{ value: '', label: 'SELECCIONE...' }}
                                        isOptionDisabled={(option) => option.isDisabled}
                                        options={optionsArribal}
                                        name='destinationLocationCode' />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Salida *</label>
                                    <div className='form-flatpickr'>
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
                                        <div className='form-flatpickr__icon'>
                                            <span className='material-icons'>calendar_today</span>
                                        </div>
                                    </div>
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Retorno</label>
                                    <div className='form-flatpickr'>
                                        <Flatpickr
                                            className='form-control flatpickr-date'
                                            value={arrivalDate}
                                            options={{
                                                enableTime: false,
                                                dateFormat: "l, d M",
                                                locale: Spanish
                                            }}
                                            onChange={(val) => (setArrivalDate(val))}
                                        />
                                        <div className='form-flatpickr__icon'>
                                            <span className='material-icons'>calendar_today</span>
                                        </div>
                                    </div>
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Adultos *</label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={{ value: '1', label: '1' }}
                                        options={numberPassengersAdult}
                                        name='adults' />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>Niños</label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={{ value: '', label: 'SELECCIONE...' }}
                                        isOptionDisabled={(option) => option.isDisabled}
                                        options={numberPassengersBaby}
                                        name='children' />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group col-span-2 text-right'>
                                    <button className='btn btn-search'>
                                        <span className='material-icons'>search</span>
                                        <strong>Buscar</strong>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home