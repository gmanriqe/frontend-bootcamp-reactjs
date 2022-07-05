import banner from '../../assets/images/bg_banner.png'

const Home = () => {
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
                    <h2>VUELOS</h2>
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
                                <input className='form-control' type='text' />
                                <span className='message-error'>Campo obligatorio</span>
                            </div>
                            <div className='form-group'>
                                <input className='form-control' type='text' />
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