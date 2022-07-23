import banner from '../assets/images/bg_banner_2.svg'

export const Banner = ({ title }) => {
    return (
        <section className="banner-z">
            <div className='sm:container px-4'>
                <div className='banner-z__content flex justify-start items-center container-small' style={
            {
                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        }>
                    <h2>{title}</h2>
                </div>
            </div>
        </section>
    )
}