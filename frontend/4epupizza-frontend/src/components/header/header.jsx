import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <div className='header_logo'>
            <div className='logo-wrapper'>
                <Link to="/"><img src="/img/4epupizza.png" alt="Logo" /></Link>
            </div>
            </div>
            <div className='nav_bar'>
                <nav>
                    <ul>
                        <li><Link to="/">Піца</Link></li>
                        <li><Link to="/constructor">Конструктор</Link></li>
                        <li><Link to="/promotions">Акції</Link></li>
                        <li>Про нас</li>
                    </ul>
                </nav>
            </div>

            <div className="header_actions">
                <Link to="/login" className="btn--login">Увійти</Link>
                <button className="btn--cart"><img src="/img/Group 3.png" alt="" /></button>
            </div>
        </header>
    )
}

export default Header
