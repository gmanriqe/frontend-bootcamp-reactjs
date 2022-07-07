import banner from '../assets/images/bg_banner.png'

export const Banner = ({ title }) => {
    return (
        <header style={
            {
                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        } className="banner-z">
            <div className='container mx-auto'>
                <div className='banner-z__content flex justify-start items-center'>
                    <h2>{title}</h2>
                </div>
            </div>
        </header>
    )
}