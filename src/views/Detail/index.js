// 1ero: Paquetes de terceros
import { useParams } from "react-router-dom"

// 2do: Paquetes de mi propio proyecto
import { Banner } from '../../components/Banner';

// RTK
import { useSelector } from 'react-redux';

const Detail = () => {
    const data = useSelector(state => state.results.data)
    const { flightId } = useParams()
    
    let dataFilter = data.filter(item => item.id === flightId)
    console.log(dataFilter)
    
    return (
        <div className="main main-detail">
            <Banner title='DETALLE DEL VUELO' />
            <section className='main main-results'>
                <div className='container mx-auto'>
                    <div className='container-small pt-lg'>
                        <p>Detalle del vuelo</p>
                        { dataFilter[0].id} -  
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Detail