// 1ero: Paquetes de terceros
import Async from "react-select/async";
import Select from "react-select";
import Flatpickr from 'react-flatpickr'; // flatpickr
import dayjs from 'dayjs'; // dayjs
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { useState } from 'react';
import { Formik, Form } from 'formik';

import { useNavigate } from 'react-router-dom';

// 2do: Paquetes de mi propio proyecto
// import { Paises as paises } from '../../../mock/Country';

// RTK
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlightStart, fetchFlightComplete, fetchFlightError } from '../../../redux/actions/results';
// Sweetalert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AsyncExample = ({ defaultOptionValue }) => {
    const loadOptions = (searchKey) => {
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
        }

        const requestOptions = {
            method: 'GET',
            headers,
        }

        return new Promise((resolve) => {
            //let myRequest = fetch('https://raw.githubusercontent.com/mwgg/Airports/master/airports.json', {
            let myRequest = fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json', {
                requestOptions
            })
            myRequest
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    let options = [{
                        value: '',
                        label: 'Seleccione una opción',
                    }]
                    Object.keys(data).forEach((key) => {
                        // console.log(airports[key])
                        options.push({
                            value: data[key].icao,
                            label: `${data[key].country} - ${data[key].city} - ${data[key].name}`
                        })
                    })                    
                    resolve(options);
                })
        });
    };

    return (
        <Async
            loadOptions={loadOptions}
            defaultOptions
        />
    );
};

/*
useEffect(() => {

    function APIShowAirport() {
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
        }

        const requestOptions = {
            method: 'GET',
            headers,
        }

        let myRequest = fetch('https://raw.githubusercontent.com/mwgg/Airports/master/airports.json', {
            requestOptions
        })
        myRequest
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                /*
                let result = new Promise((resolve) => {
                    
                    Object.keys(data).forEach((key) => {
                        // console.log(airports[key])
                        optionsDeparture.push({
                            value: data[key].icao,
                            label: `${data[key].country} - ${data[key].state} - ${data[key].city} - ${data[key].name}`
                        })
                    })
                    resolve(optionsDeparture)
                });
                result
                    .then(function () {
                        _setOptionsDeparture(optionsDeparture)
                    })
                
                let optionsDeparture = [{
                    value: '',
                    label: 'SELECCIONE...',
                    isDisabled: true
                }]

                Object.keys(data).forEach((key) => {
                    // console.log(airports[key])
                    optionsDeparture.push({
                        value: data[key].icao,
                        label: `${data[key].country} - ${data[key].state} - ${data[key].city} - ${data[key].name}`
                    })
                })

                // _setOptionsDeparture(optionsDeparture)
                _setOptionsDeparture([
                    { value: "ocean", label: "Ocean" },
                    { value: "blue", label: "Blue" },
                    { value: "purple", label: "Purple" },
                    { value: "red", label: "Red" },
                    { value: "orange", label: "Orange" },
                    { value: "yellow", label: "Yellow" },
                    { value: "green", label: "Green" },
                    { value: "forest", label: "Forest" },
                    { value: "slate", label: "Slate" },
                    { value: "silver", label: "Silver" }
                ])
            })
    }
    APIShowAirport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
*/

const MainFormSearch = ({ token }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [airports, setAirPorts] = useState([])
    // const [_optionsDeparture, _setOptionsDeparture] = useState([])

    const [optTypeFlight, setOptTypeFlight] = useState(false)
    const [totalAdults, setTotalAdults] = useState(1)
    const [totalChildren, setTotalChildren] = useState(0)

    const isLoading = useSelector(state => state.results.isLoading)

    /**
     * Mock de paises
     */

    // const optionsArribal = [{
    //     value: '',
    //     label: 'SELECCIONE...',
    //     isDisabled: true
    // }]

    /*
    Object.keys(airports).forEach(function (key) {
        // console.log(key, airports[key])
        optionsArribal.push({
            value: airports[key].icao,
            label: `${airports[key].country} - ${airports[key].state} - ${airports[key].city} - ${airports[key].name}`
        })
    })

    console.log(optionsDeparture)
    console.log(optionsArribal)*/

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

    /**
     * Dropdown
     */
    const handleDropdown = () => {
        const $dropdown = document.getElementById('dropdown-content')
        $dropdown.classList.toggle('show')
    }

    /**
     * (Por implementar) Cerrar dropdown cuando se hace click afuera
     */

    /**
     * Radio buttons (ida y regreso / solo ida)
     */
    const handleChangeRadio = (evt) => {
        const { value } = evt.target;
        const $depatureDateContent = document.getElementById('departureDate-content')

        if (value === 'going-and-return') {
            $depatureDateContent.classList.remove('col-span-2')
            setOptTypeFlight(true)
        }

        if (value === 'only-going') {
            $depatureDateContent.classList.add('col-span-2')
            setOptTypeFlight(false)
        }
    }

    /**
     * Formik validación de ida
     * @param { valores } valores del formulario
     * @returns 
     */
    const validateOnlyGoing = (valores) => {
        let errores = {};

        // Validación de origen
        if (!valores.originLocationCode.value) { // si no hay valor en el campo originLocationCode
            errores.originLocationCodeMessage = '¿DESDE DÓNDE? es requerido';
        }

        // Validación de destino
        if (valores.destinationLocationCode.value === '') {
            errores.destinationLocationCodeMessage = '¿A DÓNDE QUIERE IR? es requerido';
        }

        // Validación de fecha de salida
        if (valores.departureDate.length === 0) {
            errores.departureDateMessage = 'FECHA IDA es requerida';
        }
        return errores
    }

    /**
     * Formik validación de ida y vuelta
     * @param { valores } valores del formulario
     * @returns 
     */
    const validateGoingAndReturn = (valores) => {
        let errores = {};

        // Validación de origen
        if (!valores.originLocationCode.value) { // si no hay valor en el campo originLocationCode
            errores.originLocationCodeMessage = '¿DESDE DÓNDE? es requerido';
        }

        // Validación de destino
        if (valores.destinationLocationCode.value === '') {
            errores.destinationLocationCodeMessage = '¿A DÓNDE QUIERE IR? es requerido';
        }

        // Validación de fecha de salida
        if (valores.departureDate.length === 0) {
            errores.departureDateMessage = 'FECHA IDA es requerida';
        }

        // Validación de fecha de regreso
        if (valores.arrivalDate.length === 0) {
            errores.arrivalDateMessage = 'FECHA REGRESO es requerida';
        } else {
            // Validacion de fecha de regreso mayor a fecha de salida
            if (Date.parse(valores.departureDate[0]) > Date.parse(valores.arrivalDate[0])) {
                errores.arrivalDateHigherMessage = 'FECHA REGRESO debe ser mayor a la salida';
            }
        }
        return errores
    }

    const handleChangeAdults = (val) => {
        setTotalAdults(val.value)
    }

    const handleChangeChildren = (val) => {
        setTotalChildren(val.value)
    }

    /**
     * Enable/Disable boton de busqueda
     */
    const enableSubmit = () => {
        const $btnSearch = document.getElementById('btn-search')
        $btnSearch.classList.remove('btn-loading')
        $btnSearch.removeAttribute('disabled')
    }

    const disableSubmit = () => {
        const $btnSearch = document.getElementById('btn-search')
        $btnSearch.classList.add('btn-loading')
        $btnSearch.setAttribute('disabled', 'disabled')
    }

    /**
     * Loading boton
     */
    if (isLoading) {
        disableSubmit()
    }

    return (
        <Formik
            // valores iniciales
            initialValues={{
                originLocationCode: { value: 'SCL', label: 'Chile - Comodoro Arturo Merino Benítez International Airport' },
                destinationLocationCode: { value: '', label: 'SELECCIONE...' },
                departureDate: new Date(),
                arrivalDate: '',
                adults: { value: '1', label: '1' },
                children: { value: '', label: '0' },
            }}
            // validaciones del formulario
            validate={(valores) => {
                if (optTypeFlight === false) {
                    return validateOnlyGoing(valores);
                }

                if (optTypeFlight === true) {
                    return validateGoingAndReturn(valores);
                }
            }}
            // se ejecuta cuando el formulario es enviado
            // help: https://codesandbox.io/s/github/formik/formik/tree/master/examples/async-submission?from-embed=&file=/index.js:466-478
            onSubmit={(valores) => {
                dispatch(fetchFlightStart());
                // Solo ida
                if (optTypeFlight === false) {
                    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
                    const myRequest = fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&adults=${valores.adults.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    myRequest
                        .then(function (response) {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .then(function (data) {
                            dispatch(fetchFlightComplete(data.data))
                            navigate(`/results`)
                        })
                        .catch(function (error) {
                            dispatch(fetchFlightError(error))
                            MySwal.fire({
                                text: 'Hemos tenido un problema con la búsqueda. Consulte con el administrador del sistema.',
                                icon: 'warning',
                                confirmButtonText: 'OK',
                                showCloseButton: true, // icon cerrar
                                allowOutsideClick: false, // click afuera no cierra
                                allowEscapeKey: true, // keyup esc cierra
                                customClass: {
                                    container: 'swal-content',
                                }, // nueva clase en el moda
                            }).then((result) => {
                                enableSubmit()
                            })
                        })
                }

                // Ida y regreso
                if (optTypeFlight === true) {
                    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
                    const dateReturn = dayjs(new Date(valores.arrivalDate)).format('YYYY-MM-DD')
                    const myRequest = fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&returnDate=${dateReturn}&adults=${valores.adults.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    myRequest
                        .then(function (response) {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .then(function (data) {
                            dispatch(fetchFlightComplete(data.data))
                            navigate(`/results`)
                        })
                        .catch(function (error) {
                            dispatch(fetchFlightError(error))
                            enableSubmit()
                        })
                }
            }}

        >
            {({ values, errors }) => ( // {} es por la destructuracion
                <Form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='form-group col-span-2 flex'>
                        <div className='form-control-radio'>
                            <input
                                type='radio'
                                id='opt-return-date'
                                name='opt-content-page'
                                defaultValue='only-going'
                                onChange={handleChangeRadio}
                                defaultChecked
                            />
                            <input
                                type='radio'
                                id='opt-departure-date'
                                name='opt-content-page'
                                defaultValue='going-and-return'
                                onChange={handleChangeRadio}
                            />
                            <label htmlFor='opt-return-date' className='form-label'>
                                <div className='form-control-radio__dot'></div>
                                <span>SOLO IDA</span>
                            </label>
                            <label htmlFor='opt-departure-date' className='form-label'>
                                <div className='form-control-radio__dot'></div>
                                <span>IDA Y REGRESO</span>
                            </label>
                        </div>
                        <div className='form-control-dropdown'>
                            <button
                                type="button"
                                className='dropdown'
                                onClick={() => handleDropdown()}
                            >
                                <span className="material-icons">person_4</span>
                                <span className='label'>{totalAdults + totalChildren}</span>
                                <span className="material-icons">arrow_drop_down</span>
                            </button>
                            <div className='dropdown-content' id="dropdown-content">
                                <div className='form-group'>
                                    <label htmlFor='adults' className='form-label'>Adultos *</label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={values.adults}
                                        options={numberPassengersAdult}
                                        id='adults'
                                        onChange={(val) => handleChangeAdults(val)}
                                    />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='children' className='form-label'>Niños <small>(3 a 11 años)</small></label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={values.children}
                                        isOptionDisabled={(option) => option.isDisabled}
                                        options={numberPassengersBaby}
                                        id='children'
                                        onChange={(val) => handleChangeChildren(val)}
                                    />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /////////////////////////////////////////// */}
                    <div className='form-group'>
                        <label htmlFor='originLocationCode' className='form-label'>¿Desde dónde? *</label>
                        <Async
                        // className='form-control-select'
                        //defaultValue={values.originLocationCode}
                        //options={optionsDeparture}
                        // id='originLocationCode'
                        //cacheOptions
                        // defaultOptions = {}
                        // loadOptions={() => (_optionsDeparture)}
                        />
                        <AsyncExample
                            defaultOptionValue={"slate"}
                        />
                        {errors.originLocationCodeMessage && <span className='message-error error'>{errors.originLocationCodeMessage}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='destinationLocationCode' className='form-label'>¿A dónde quiere ir? *</label>
                        <Async
                        // className='form-control-select'
                        // defaultValue={values.destinationLocationCode}
                        // options={optionsArribal}
                        // id='destinationLocationCode'
                        // onChange={(val) => (values.destinationLocationCode = val)}
                        //cacheOptions
                        //defaultOptions

                        />
                        {errors.destinationLocationCodeMessage && <span className='message-error error'>{errors.destinationLocationCodeMessage}</span>}
                    </div>
                    <div className='form-group col-span-2' id='departureDate-content'>
                        <label htmlFor='departureDate' className='form-label'>FECHA IDA *</label>
                        <div className='form-flatpickr'>
                            <Flatpickr
                                className='form-control'
                                placeholder='SELECCIONE...'
                                value={values.departureDate}
                                options={{
                                    enableTime: false,
                                    dateFormat: 'l, d M',
                                    locale: Spanish,
                                    minDate: "today"
                                }}
                                id='departureDate'
                                onChange={(val) => values.departureDate = val.length === 0 ? '' : new Date(new Date(val[0]).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))}
                            />
                            <div className='form-flatpickr__icon'>
                                <span className='material-icons'>calendar_today</span>
                            </div>
                        </div>
                        {errors.departureDateMessage && <span className='message-error error'>{errors.departureDateMessage}</span>}
                    </div>
                    {
                        optTypeFlight ?
                            <div className='form-group' id='returnDate-content'>
                                <label htmlFor='returnDate' className='form-label'>FECHA REGRESO *</label>
                                <div className='form-flatpickr'>
                                    <Flatpickr
                                        className='form-control flatpickr-date'
                                        placeholder='SELECCIONE...'
                                        value={values.arrivalDate}
                                        options={{
                                            enableTime: false,
                                            dateFormat: "l, d M",
                                            locale: Spanish,
                                            minDate: "today"
                                        }}
                                        id='returnDate'
                                        onChange={(val) => values.arrivalDate = val.length === 0 ? '' : new Date(new Date(val[0]).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))}
                                    />
                                    <div className='form-flatpickr__icon'>
                                        <span className='material-icons'>calendar_today</span>
                                    </div>
                                </div>
                                {errors.arrivalDateMessage && <span className='message-error error'>{errors.arrivalDateMessage}</span>}
                                {errors.arrivalDateHigherMessage && <span className='message-error error'>{errors.arrivalDateHigherMessage}</span>}
                            </div> : null
                    }
                    <div className='form-group col-span-2 text-right'>
                        <button type="submit" className='btn btn-search' id="btn-search">
                            <em className='material-icons animate-spin'>sync</em>
                            <span className='material-icons'>search</span>
                            <strong>Buscar</strong>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default MainFormSearch