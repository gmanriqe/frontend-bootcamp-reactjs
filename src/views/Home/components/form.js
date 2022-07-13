import Select from 'react-select'
import Flatpickr from 'react-flatpickr'; // flatpickr
import dayjs from 'dayjs'; // dayjs
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Paises as paises } from '../../../mock/Country';
import { useDispatch } from 'react-redux';
import { setListFlight } from '../../../redux/slices/flightSlice';


const MainFormSearch = ({ token }) => {
    const dispatch = useDispatch();
    const [optTypeFlight, setOptTypeFlight] = useState(false)
    const [totalAdults, setTotalAdults] = useState(1)
    const [totalChildren, setTotalChildren] = useState(0)

    /**
     * Mock de paises
     */
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
            onSubmit={async (valores) => {
                console.log(valores)
                // Solo ida
                if (optTypeFlight === false) {
                    const dateDeparture = await dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
                    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&adults=${valores.adults.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data = await response.json();
                    dispatch(setListFlight(data.data))
                }

                // Ida y regreso
                if (optTypeFlight === true) {
                    const dateDeparture = dayjs(new Date(valores.departureDate)).format('YYYY-MM-DD')
                    const dateReturn = dayjs(new Date(valores.arrivalDate)).format('YYYY-MM-DD')
                    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${valores.originLocationCode.value}&destinationLocationCode=${valores.destinationLocationCode.value}&departureDate=${dateDeparture}&returnDate=${dateReturn}&adults=${valores.adults.value}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data = await response.json();
                    dispatch(setListFlight(data.data))
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
                        <button type="submit" className='btn btn-search'>
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