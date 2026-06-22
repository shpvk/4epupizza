import './footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-inner">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/logo.png" alt="4epupizza" />
                        </Link>
                    </div>

                    <nav className="footer-nav">
                        <Link to="/">Главная</Link>
                        <Link to="/constructor">Конструктор</Link>
                        <Link to="/promotions">Акции</Link>
                        <Link to="/about">О нас</Link>
                        <Link to="/cart">Корзина</Link>
                    </nav>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-phone">
                    <a href="tel:+380673152724">+380 67 315 27 24</a>
                </div>

                <div className="footer-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/instagram.svg" alt="" />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/x.svg" alt="" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <img src="https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/important/facebook.svg" alt="" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
