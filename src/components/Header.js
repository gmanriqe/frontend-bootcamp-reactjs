import { Link } from "react-router-dom";

import logo from '../assets/images/logo_flight.png'

export const Header = () => {
    return (
        <header className='header'>
            <Link to='/'>
                <figure>
                    <img src={logo} alt='Flight Search' />
                </figure>
            </Link>
        </header>
    );
}