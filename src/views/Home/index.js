// 1ero: Paquetes de terceros
import 'flatpickr/dist/themes/material_green.css';
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'; // flatpickr
import dayjs from 'dayjs'; // dayjs
import { useEffect, useState } from 'react';
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
// import { useNavigate } from 'react-router'
import { Formik } from 'formik';

// 2do: Paquetes de mi propio proyecto
import { Banner } from '../../components/Banner';
import { Paises as paises } from '../../mock/Country';
import { formData } from '../../mock/Token';
dayjs.locale('es')

const Home = () => {

    // const navigate = useNavigate()

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

    const optionsDeparture = [
        {
            value: '',
            label: 'SELECCIONE...',
            isDisabled: true
        }
    ]
    if (dataFilter.length > 0) {
        dataFilter.map(item =>
            optionsDeparture.push({
                value: item.code,
                label: `${item.countryName} - ${item.name}`
            })
        )
    }

    const optionsArribal = [
        {
            value: '',
            label: 'SELECCIONE...',
            isDisabled: true
        }
    ]
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
        label: 0
    }]
    for (let i = 1; i < 10; i++) {
        numberPassengersBaby.push({
            value: i,
            label: i
        })
    }


    /*
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
    */

    return (
        <>
            <Banner title='' />
            <section className='pt-lg'>
                <div className='container mx-auto'>
                    <div className='search-flight'>
                        <h2 className="text-center">VUELOS</h2>
                        <div className='card p-sm'>
                            <Formik
                                // valores iniciales
                                initialValues={{
                                    originLocationCode: { value: 'SCL', label: 'Chile - Comodoro Arturo Merino Benítez International Airport' },
                                    destinationLocationCode: { value: '', label: 'SELECCIONE...' },
                                    departureDate: new Date(),
                                    arrivalDate: '',
                                }}
                                // validaciones del formulario
                                validate={(valores) => {
                                    console.log(valores)
                                    let errores = {};
                                    console.log(valores.originLocationCode.value)
                                    if (!valores.originLocationCode.value) { // si no hay valor en el campo originLocationCode
                                        errores.originLocationCodeMessage = '¿DESDE DÓNDE? es requerido';
                                    }
                                    if (!valores.destinationLocationCode.value) {
                                        errores.destinationLocationCodeMessage = '¿A DÓNDE QUIERE IR? es requerido';
                                    }
                                    if (valores.departureDate.length === 0) {
                                        errores.departureDateMessage = 'SALIDA es requerida';
                                    }
                                    if (valores.arrivalDate.length) {
                                        console.log(valores.arrivalDate.length)
                                        if (Date.parse(valores.departureDate) > Date.parse(valores.arrivalDate)) {
                                            errores.arrivalDateHigherMessage = 'RETORNO debe ser mayor a la salida';
                                        }
                                    }
                                    return errores;
                                }}
                                // se ejecuta cuando el formulario es enviado
                                onSubmit={(valores) => {
                                    console.log(valores);
                                    // console.log(valores.destinationLocationCode.value)
                                }}
                            >
                                {({ values, errors, handleSubmit }) => ( // {} es por la destructuracion
                                    <form className='grid grid-cols-1 lg:grid-cols-2 gap-4' onSubmit={handleSubmit} >
                                        {console.log(values)}
                                        <div className='form-group col-span-2'>
                                            <div className='form-control-radio'>
                                                <input
                                                    type='radio'
                                                    id='opt-departure-date'
                                                    name='opt-content-page'
                                                    defaultChecked
                                                />
                                                <input
                                                    type='radio'
                                                    id='opt-return-date'
                                                    name='opt-content-page'
                                                />
                                                <label htmlFor='opt-departure-date' className='form-label'>
                                                    <div className='form-control-radio__dot'></div>
                                                    <span>IDA Y REGRESO</span>
                                                </label>
                                                <label htmlFor='opt-return-date' className='form-label'>
                                                    <div className='form-control-radio__dot'></div>
                                                    <span>SOLO IDA</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='originLocationCode' className='form-label'>¿Desde dónde? *</label>
                                            <Select
                                                className='form-control-select'
                                                defaultValue={values.originLocationCode}
                                                options={optionsDeparture}
                                                id='originLocationCode'
                                                onChange={(val) => (values.originLocationCode = val)}
                                            />
                                            {errors.originLocationCodeMessage && <span className='message-error error'>{errors.originLocationCodeMessage}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='destinationLocationCode' className='form-label'>¿A dónde quiere ir? *</label>
                                            <Select
                                                className='form-control-select'
                                                defaultValue={values.destinationLocationCode}
                                                options={optionsArribal}
                                                id='destinationLocationCode'
                                                onChange={(val) => (values.destinationLocationCode = val)}
                                            />
                                            {errors.destinationLocationCodeMessage && <span className='message-error error'>{errors.destinationLocationCodeMessage}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='departureDate' className='form-label'>FECHA IDA *</label>
                                            <div className='form-flatpickr'>
                                                <Flatpickr
                                                    className='form-control'
                                                    value={values.departureDate}
                                                    options={{
                                                        enableTime: false,
                                                        dateFormat: 'l, d M',
                                                        locale: Spanish
                                                    }}
                                                    id='departureDate'
                                                    onChange={(val) => (values.departureDate = val)}
                                                />
                                                <div className='form-flatpickr__icon'>
                                                    <span className='material-icons'>calendar_today</span>
                                                </div>
                                            </div>
                                            {errors.departureDateMessage && <span className='message-error error'>{errors.departureDateMessage}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='returnDate' className='form-label'>FECHA REGRESO</label>
                                            <div className='form-flatpickr'>
                                                <Flatpickr
                                                    className='form-control flatpickr-date'
                                                    value={values.arrivalDate}
                                                    options={{
                                                        enableTime: false,
                                                        dateFormat: "l, d M",
                                                        locale: Spanish
                                                    }}
                                                    name='returnDate'
                                                    id='returnDate'
                                                    onChange={(val) => (values.arrivalDate = val)}
                                                />
                                                <div className='form-flatpickr__icon'>
                                                    <span className='material-icons'>calendar_today</span>
                                                </div>
                                            </div>
                                            {errors.arrivalDateMessage && <span className='message-error error'>{errors.arrivalDateMessage}</span>}
                                            {errors.arrivalDateHigherMessage && <span className='message-error error'>{errors.arrivalDateHigherMessage}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='adults' className='form-label'>Adultos *</label>
                                            <Select
                                                className='form-control-select'
                                                defaultValue={{ value: '1', label: '1' }}
                                                options={numberPassengersAdult}
                                                name='adults'
                                                id='adults'
                                            />
                                            <span className='message-error'>Campo obligatorio</span>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='children' className='form-label'>Niños <small>(3 a 11 años)</small></label>
                                            <Select
                                                className='form-control-select'
                                                defaultValue={{ value: '', label: '0' }}
                                                isOptionDisabled={(option) => option.isDisabled}
                                                options={numberPassengersBaby}
                                                name='children'
                                                id='children'
                                            />
                                            <span className='message-error'>Campo obligatorio</span>
                                        </div>
                                        <div className='form-group col-span-2 text-right'>
                                            <button type="submit" className='btn btn-search'>
                                                <span className='material-icons'>search</span>
                                                <strong>Buscar</strong>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home