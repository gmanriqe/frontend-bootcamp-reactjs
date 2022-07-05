// Export components my files
import banner from '../../assets/images/bg_banner.png'
import "flatpickr/dist/themes/material_green.css";


import Flatpickr from "react-flatpickr";
import { useState } from 'react';

import { Spanish} from 'flatpickr/dist/l10n/es.js'; // configure language for flatpickr

const Home = () => {
    
    const [state, setstate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    return (
        <>
            <header style={
                {
                    backgroundImage: `url(${banner})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '380px',
                }
            }>
                <div className='container mx-auto'>
                    <h1>VUELOS</h1>
                </div>
            </header>
            <section className='p-lg'>
                <div className='container mx-auto'>
                    <div className='card p-sm'>
                        <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className='form-group'>
                                <select className='form-control'></select>
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <select className='form-control'></select>
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