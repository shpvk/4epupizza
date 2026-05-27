import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="/img/4epupizza.png" alt="4epupizza" />
                </div>
                
                <div className="footer-links">
                    <div className="footer-column">
                        <a href="#" className="footer-column-title">Главная</a>
                        <a href="#">К заказу</a>
                        <a href="#">О нас</a>
                        <a href="#">Мероприятия</a>
                        <a href="#">Меню</a>
                    </div>
                    
                    <div className="footer-column footer-column-mt">
                        <a href="#">3 Пиццы + 1 Кофе в подарок</a>
                        <a href="#">2 Пиццы по цене 1</a>
                        <a href="#">Экскурсия по кухне</a>
                    </div>
                    
                    <div className="footer-column">
                        <span className="footer-column-title">Меню</span>
                        <a href="#">Показать все</a>
                        <a href="#">Морепродукты</a>
                        <a href="#">Веган</a>
                        <a href="#">Мясо</a>
                    </div>
                    
                    <div className="footer-column">
                        <span className="footer-column-title">О нас</span>
                        <a href="#">Наша история</a>
                        <a href="#">Почему мы?</a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-phone">
                    +380 67 315 27 24
                </div>
                <div className="footer-socials">
                    <a href="#" aria-label="Instagram">
                        <img src="/img/instagram.svg" alt="" />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <img src="/img/x.svg" alt="" />
                    </a>
                    <a href="#" aria-label="Facebook">
                        <img src="/img/facebook.svg" alt="" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
