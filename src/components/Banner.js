import banner from '../assets/images/bg_banner_2.svg'

export const Banner = ({ title }) => {
    return (
        <header className="banner-z">
            <div className='container mx-auto'>
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
        </header>
    )
}