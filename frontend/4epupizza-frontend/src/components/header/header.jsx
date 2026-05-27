import React from 'react'
import './header.css'

function Header() {
    return (
        <header className="header">
            <div className='header_logo'>
            <a><img src="/img/4epupizza.png" /></a>
            </div>

            <div className='nav_bar'>
                <nav>
                    <ul>
                        <li>Пицца</li>
                        <li>Конструктор</li>
                        <li>Акции</li>
                        <li>Про нас</li>
                    </ul>
                </nav>
            </div>
            <div className='header_actions'>
                <button className="btn--login">Login</button>
                <button className="btn--cart"><img src='/img/Group 3.png'></img></button>
            </div>
        </header>
    )
}

export default Header
