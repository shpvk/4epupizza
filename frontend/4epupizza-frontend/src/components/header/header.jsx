import './header.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Header() {
    const { totalItems } = useCart()

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
                <Link to="/cart" className="btn--cart" id="header-cart-button">
                    <img src="/img/Group 3.png" alt="Кошик" />
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
                    )}
                </Link>
            </div>
        </header>
    )
}

export default Header
