// 1ero: Paquetes de terceros
import { useParams, Link } from "react-router-dom"
// RTK
import { useSelector } from 'react-redux';
// DAYJS
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'

// 2do: Paquetes de mi propio proyecto
import Header from "../../components/Header";
import { Banner } from "../../components/Banner";

dayjs.locale('es');
const Detail = () => {
    const data = useSelector(state => state.results.data)
    const { flightId } = useParams()

    let dataFilter = data.filter(item => item.id === flightId)
    const { itineraries } = dataFilter[0]
    const { grandTotal, currency } = dataFilter[0].price
    console.log(itineraries)

    const renderHTMLDepartureHour = (value) => {
        let date = new Date(value)
        let dateDeparture = dayjs(date).format('HH:mm')
        return `${dateDeparture} hrs`
    }

    const renderHTMLArrivalHour = (value) => {
        let date = new Date(value)
        let dateArrival = dayjs(date).format('HH:mm')
        return `${dateArrival} hrs`
    }

    const renderHTMLDate = (value) => {
        let date = new Date(value)
        let dateArrival = dayjs(date).format('DD MMMM YYYY')
        return `${dateArrival}`
    }

    const renderIMAGECarrier = (value) => {
        return require(`../../assets/images/carriers/${value}.png`)
    }
    return (
        <main className='main main-detail'>
            <Header />
            <Banner title='ITINERARIO' />
            <section className='sm:container px-4 pb-10'>
                <div className='container-small pt-6 sm:pt-16'>
                    <div className='header-navigation'>
                        <p>Duración: {itineraries[0].duration.split('PT')[1].replace(/H/g, ' hrs ').replace(/M/g, ' mins ')}</p>
                        <Link to='/results'><span className="material-icons icon-return">west</span></Link>
                    </div>
                    <div className='card-flight-detail'>
                        <div className='card-flight-detail__total'>
                            <p><strong>{grandTotal} {currency}</strong></p>
                        </div>
                        <div>
                            {
                                itineraries[0].segments.map((item, idx) => (
                                    <div key={idx} className='card-flight-detail__item'>
                                        <ul>
                                            <li>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <figure className='card-flight-detail__image'>
                                                        <img src={renderIMAGECarrier(item.carrierCode)} alt={item.carrierCode} />
                                                    </figure>
                                                    <div style={{ display: 'flex'}}>
                                                        <div className='card-flight-detail__info'>
                                                            <p><strong>{item.departure.iataCode}</strong></p>
                                                            <p><small>{renderHTMLDepartureHour(item.departure.at)}</small></p>
                                                            <p><small>{renderHTMLDate(item.departure.at)}</small></p>
                                                        </div>
                                                        <div className='card-flight-detail__split'>
                                                            <div>
                                                                <span className="material-icons card-flight-detail__aircraft">local_airport</span>
                                                            </div>
                                                        </div>
                                                        <div className='card-flight-detail__info'>
                                                            <p><strong>{item.arrival.iataCode}</strong></p>
                                                            <p><small>{renderHTMLArrivalHour(item.arrival.at)}</small></p>
                                                            <p><small>{renderHTMLDate(item.arrival.at)}</small></p>
                                                        </div>
                                                        <div className='card-flight-detailt__numflight'>
                                                            <small>
                                                                {item.number} Nro. de vuelo
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Detail