import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
        <div className="container">
            <nav className='nav'>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/contracts'>Contracts</NavLink></li>
                    <li><NavLink to='/orders'>Orders</NavLink></li>
                    <li><NavLink to='/products'>Products</NavLink></li>
                    <li><NavLink to='/workshops'>Workshops</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header