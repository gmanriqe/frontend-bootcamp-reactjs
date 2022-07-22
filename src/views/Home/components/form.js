// 1ero: Paquetes de terceros
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'; // flatpickr
import dayjs from 'dayjs'; // dayjs
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { useCallback, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import { useNavigate } from 'react-router-dom';

// RTK
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlightStart, fetchFlightComplete, fetchFlightError } from '../../../redux/actions/results';
// Sweetalert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import sortArrayForName from '../../../utils/sortArrayForName';

const MySwal = withReactContent(Swal);
const MainFormSearch = ({ token }) => {
    const URL_BASE = 'https://test.api.amadeus.com/v2/shopping/flight-offers'

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [optTypeFlight, setOptTypeFlight] = useState(false)
    const [totalPersons, setTotalPersons] = useState(1)
    const [selectedAdults, setSelectedAdults] = useState({ value: '1', label: '1' }) // valor que este seleccionado en adulto
    const [selectedChildren, setSelectedChildren] = useState({ value: 0, label: 0 }) // valor que este seleccionado en niños

    const isLoading = useSelector(state => state.results.isLoading)

    /**
     * Paises (PRUEBA 2)
     */
    const [originLocationCode, setOriginLocationCode] = useState({ value: 'LIM', label: 'Peru (Lima) - Jorge Chavez Intl' })
    const [destinationLocationCode, setdestinationLocationCode] = useState({ value: '', label: 'Seleccione una opción' })
    const [country, setCountry] = useState([])
    const [country2, setCountry2] = useState([])

    /**
     * @param {options} options - Array de paises
     */
    const removingSelected = useCallback((options) => {
        // Removiendo el pais que ya se haya seleccionado
        let widthoutSelected = options.filter(option => option.value !== originLocationCode.value) // 'LIM' es el pais que se ha seleccionado por defecto
        setCountry2(widthoutSelected)
    }, [originLocationCode])

    useEffect(() => {
        const APIListPaises = () => {
            const headers = {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
            }

            const requestOptions = {
                method: 'GET',
                headers,
            }

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
                    sortArrayForName(data, 'country')

                    let options = [{
                        value: '',
                        label: 'Seleccione una opción',
                    }]

                    data.forEach((data) => {
                        options.push({
                            value: data.iata_code,
                            label: `${data.country} (${data.city}) - ${data.name}`
                        })
                    })

                    setCountry(options);
                    removingSelected(options)
                })
        }
        APIListPaises()
    }, [removingSelected])

    /**
     * Mock de paises
     */
    const dataFilter = country.filter((item) => {
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

    const numberPassengersChildren = [{
        value: 0,
        label: 0
    }]
    for (let i = 1; i < 10; i++) {
        numberPassengersChildren.push({
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

        // Validación fecha de ida
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

        // Validación de fecha de id
        if (valores.departureDate.length === 0) {
            errores.departureDateMessage = 'FECHA IDA es requerida';
        }

        // Validación de fecha de regreso
        if (valores.arrivalDate.length === 0) {
            errores.arrivalDateMessage = 'FECHA REGRESO es requerida';
        } else {
            //Validación  fecha de ida debe ser mayor a fecha de regreso
            let dateDepartureFormat = new Date(new Date(valores.departureDate).getFullYear(), new Date(valores.departureDate).getMonth(), new Date(valores.departureDate).getDate())
            let dateArrivalFormat = new Date(new Date(valores.arrivalDate).getFullYear(), new Date(valores.arrivalDate).getMonth(), new Date(valores.arrivalDate).getDate())

            // Para manejar la comparación de igualdad, usamos el objeto de fecha junto con el getTime()método de fecha que devuelve la cantidad de milisegundos. Pero si queremos comparar información específica como día, mes, etc., podemos usar otros métodos de fecha como getDate(), getHours(), getDay()y .getMonth()getYear()
            // https://www.freecodecamp.org/news/javascript-date-comparison-how-to-compare-dates-in-js/
            if (dateDepartureFormat.getTime() === dateArrivalFormat.getTime() || dateDepartureFormat.getTime() > dateArrivalFormat.getTime()) {
                errores.arrivalDateHigherMessage = 'FECHA REGRESO debe ser mayor a la salida';
            }
        }
        return errores
    }

    const handleChangeAdults = (val) => {
        setSelectedAdults(val) // seteo del estado de los adultos
        setTotalPersons(Number(selectedChildren.value) + Number(val.value))
    }

    const handleChangeChildren = (val) => {
        setSelectedChildren(val) // seteo del estado de los niños
        setTotalPersons(Number(selectedAdults.value) + Number(val.value))
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
                originLocationCode,
                destinationLocationCode,
                departureDate: new Date(),
                arrivalDate: '',
                adults: selectedAdults,
                children: selectedChildren,
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
                const { value } = selectedChildren
                dispatch(fetchFlightStart());
                // Solo ida
                if (optTypeFlight === false) {
                    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')

                    // 4 valores minimos que se envian como parametro
                    let url = new URL(`${URL_BASE}?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&adults=${valores.adults.value}`)
                    let params = new URLSearchParams(url.search)
                    
                    // Si hay niños, se agrega como parametro
                    if (value > 0) params.set('children', value)

                    const myRequest = fetch(`${URL_BASE}?${params}`, {
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
                                customClass: { // nueva clase en el moda
                                    container: 'swal-content',
                                },
                            }).then((result) => {
                                enableSubmit()
                            })
                        })
                }

                // Ida y regreso
                if (optTypeFlight === true) {
                    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
                    const dateReturn = dayjs(new Date(valores.arrivalDate)).format('YYYY-MM-DD')
                    
                    // 4 valores minimos que se envian como parametro
                    let url = new URL(`${URL_BASE}?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&returnDate=${dateReturn}&adults=${valores.adults.value}`)
                    let params = new URLSearchParams(url.search)
                    
                    // Si hay niños, se agrega como parametro
                    if (value > 0) params.set('children', value)

                    const myRequest = fetch(`${URL_BASE}?${params}`, {
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
                // <Form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Form className='grid grid-cols-2 gap-2'>
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
                                <span className='label'>{totalPersons}</span>
                                <span className="material-icons">arrow_drop_down</span>
                            </button>
                            <div className='dropdown-content' id="dropdown-content">
                                <div className='form-group'>
                                    <label htmlFor='adults' className='form-label'>Adultos * <small>(12 años a +)</small></label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={values.adults}
                                        options={numberPassengersAdult}
                                        id='adults'
                                        onChange={(val) => {
                                            handleChangeAdults(val)
                                        }}
                                    />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='children' className='form-label'>Niños <small>(3 a 11 años)</small></label>
                                    <Select
                                        className='form-control-select'
                                        defaultValue={values.children}
                                        isOptionDisabled={(option) => option.isDisabled}
                                        options={numberPassengersChildren}
                                        id='children'
                                        onChange={(val) => {
                                            handleChangeChildren(val)
                                        }}
                                    />
                                    <span className='message-error'>Campo obligatorio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-group col-span-2 md:col-span-1'>
                        <label htmlFor='originLocationCode' className='form-label'>¿Desde dónde? *</label>
                        <Select
                            className='form-control-select'
                            defaultValue={values.originLocationCode}
                            options={country}
                            id='originLocationCode'
                            onChange={(val) => {
                                values.originLocationCode = val
                                setOriginLocationCode(val)
                            }}
                        />
                        {errors.originLocationCodeMessage && <span className='message-error error'>{errors.originLocationCodeMessage}</span>}
                    </div>
                    <div className='form-group col-span-2 md:col-span-1'>
                        <label htmlFor='destinationLocationCode' className='form-label'>¿A dónde quiere ir? *</label>
                        <Select
                            className='form-control-select'
                            defaultValue={values.destinationLocationCode}
                            options={country2}
                            id='destinationLocationCode'
                            onChange={(val) => {
                                values.destinationLocationCode = val
                                setdestinationLocationCode(val)
                            }}
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