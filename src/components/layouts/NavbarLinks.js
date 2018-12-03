import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Home..</NavLink></li>
        </ul>
    )
}

export default NavbarLinks;