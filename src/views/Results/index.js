// 1ero: Paquetes de terceros
import { useNavigate, Link } from "react-router-dom";
// DAYJS
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
// RTK
import { useSelector } from "react-redux";
// SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

// 2do: Paquetes de mi propio proyecto
import { Header } from '../../components/Header';
import { Banner } from "../../components/Banner";
import stateError from '../../assets/images/results_0.svg'

dayjs.locale('es');
const MySwal = withReactContent(Swal);
const Results = () => {
    
    const navigate = useNavigate()
    const stateFlight = useSelector(state => state.results.data);

    if (stateFlight.length === 0) {
        setTimeout(() => {
            navigate('/')
        }, 25000)
    }

    const handleReserve = (elem, id) => {
        MySwal.fire({
            text: `ID = ${id}. Gracias por haber llegado hasta aquí.`,
            icon: 'warning',
            confirmButtonText: 'OK',
            showCloseButton: true, // icon cerrar
            allowOutsideClick: false, // click afuera no cierra
            allowEscapeKey: true, // keyup esc cierra
            customClass: { // nueva clase en el moda
                container: 'swal-content',
            },
        }).then((result) => {})
    }

    const renderHTMLDepartureHour = (value) => {
        let date = new Date(value)
        let dateDeparture = dayjs(date).format('HH:mm')
        return `${dateDeparture}`
    }

    const renderHTMLDate = (value) => {
        let date = new Date(value)
        let dateArrival = dayjs(date).format('DD MMMM YYYY')
        return `${dateArrival}`
    }

    const renderIMAGECarrier = (value) => {
        return require(`../../assets/images/carriers/${value}.png`)
    }

    const removeClass = () => {
        let resultItem = document.querySelectorAll('.card-flight.show')
        resultItem.forEach((item) => {
            item.classList.remove('show')
        })
    }

    const deleteNodoDetalle = () => {
        let nodoDetail = document.querySelectorAll('.card-flight-detailt')
        nodoDetail.forEach((item) => {
            item.remove()
        })
    }

    const insertAfter = (elem, newNodo) => {
        elem.parentNode.insertBefore(newNodo, elem.nextSibling)
    }

    const loadNodoDetail = (elem, data) => {
        const { itineraries, id } = data[0]
        const $newNodo = document.createElement('div')
        $newNodo.classList.add('card-flight-detailt')

        let html = `<div>`
        itineraries[0].segments.map((item, idx) => (
            html += `<div class='card-flight-detailt__item'>
                <div class='card-flight-detailt__left flex'>
                    <figure class='card-flight-detailt__image'>
                        <img src="${renderIMAGECarrier(item.carrierCode)}" alt="${item.carrierCode}" />
                    </figure>
                    <div class='card-flight-detailt__row'>
                        <div class='card-flight-detailt__info'>
                            <div class='flex items-end'>
                                <p>
                                    <span class='card-flight-detailt__time'>${renderHTMLDepartureHour(item.departure.at)}</span>
                                </p>
                                <div class='card-flight-detailt__content-date'>
                                    <strong>${item.departure.iataCode}</strong>
                                    <small class='card-flight-detailt__date'>${renderHTMLDate(item.departure.at)}</small>
                                </div>
                            </div>
                        </div>
                        <div class='card-flight-detailt__info card-flight-detailt__info--transparent'>
                            <div class='flex items-end'>
                                <p>
                                    <span class='card-flight-detailt__time'>${renderHTMLDepartureHour(item.arrival.at)}</span>
                                </p>
                                <div class='card-flight-detailt__content-date'>
                                    <strong>${item.arrival.iataCode}</strong>
                                    <small class='card-flight-detailt__date'>${renderHTMLDate(item.arrival.at)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        ))
        html += `</div>`
        html += `<div class='card-flight-detailt__bottom'>
            <button type='button' class='btn btn-primary' onclick='handleReserve(e=this, ${id})'>Reservar</button>
        </div>`

        $newNodo.innerHTML = html
        insertAfter(elem, $newNodo)
    }

    const handleFlightDetail = (evt, id) => {
        if (!evt.target.closest('.card-flight')) return

        let selectedElem = evt.target.closest('.card-flight')
        if (selectedElem.classList.value === 'card-flight') {
            let dataFilter = stateFlight.filter(item => item.id === id)

            deleteNodoDetalle()
            removeClass()

            selectedElem.classList.add('show')
            loadNodoDetail(selectedElem, dataFilter)
        } else if (selectedElem.classList.value === 'card-flight show') {
            deleteNodoDetalle()
            removeClass()
        }
    }

    window.handleReserve = handleReserve;

    return (
        <>
            <Header />
            <Banner title='VUELOS DISPONIBLES' />
            <section className='main main-results'>
                <div className='sm:container px-4'>
                    <div className='container-small pt-6 sm:pt-16'>
                        <div className='header-navigation'>
                            <p>Total resultados: {stateFlight.length}</p>
                            <Link to='/'><span className="material-icons icon-return">west</span></Link>
                        </div>
                        <ul className={stateFlight.length === 0 ? 'list-flight list-flight--widthout-shadow grid grid-cols-1' : 'list-flight grid grid-cols-1'} >
                            {
                                stateFlight.length > 0
                                    ? stateFlight.map((item, idx) => (
                                        <li key={idx} className='card-flight'>
                                            <div className="flex justify-between items-center">
                                                <div className='card-flight__left flex'>
                                                    <div className='card-flight__image'>
                                                        <span className='material-icons'>local_airport</span>
                                                    </div>
                                                    <div className='card-flight__hours'>
                                                        <p><strong>{item.numberOfBookableSeats} {Number(item.numberOfBookableSeats) === 1 ? 'UND.' : 'UNDS.'} DISP. </strong></p>
                                                        <small><strong>Duración: </strong>{item.itineraries[0].duration.split('PT')[1].replace(/H/g, ' hrs ').replace(/M/g, ' mins ')}</small>
                                                        <small><strong>Fec. final de reserva: </strong>{dayjs(new Date(item.lastTicketingDate)).format('DD MMMM YYYY')}</small>
                                                    </div>
                                                </div>
                                                <p className='card-flight__luggage'> {item.oneWay === true ? '' : <span className="material-icons">no_luggage</span>} <span>{item.price.grandTotal} {item.price.currency}</span></p>
                                                <button className='card-flight__dropdown' title="VER DETALLE" data-id={item.id} onClick={(evt => handleFlightDetail(evt, item.id))}>
                                                    <span className="material-icons">expand_less</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                    : <div>
                                        <p>¡Vaya! No hay ningún resultado.<Link to='/' className='link-return-page'> Nueva búsqueda</Link></p>
                                        <figure className='widthout-result-img'>
                                            <img src={stateError} alt="No results" />
                                        </figure>
                                    </div>
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Results;