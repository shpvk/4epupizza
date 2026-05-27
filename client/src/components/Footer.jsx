import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <a href="#" className="site-header__logo">
            <span className="logo-mark">P</span>
            <span className="logo-text">Pizza<span>.</span></span>
          </a>
          <p>The fastest pizza in town. Hot, honest, hand-made.</p>
        </div>

        <div className="site-footer__cols">
          <div>
            <h4>Menu</h4>
            <ul>
              <li><a href="#">Pizza</a></li>
              <li><a href="#">Burritos</a></li>
              <li><a href="#">Fries</a></li>
              <li><a href="#">Drinks</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@pizza.com">hello@pizza.com</a></li>
              <li><a href="tel:+10000000000">+1 000 000 0000</a></li>
              <li>123 Pizza St, City</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__social">
          <h4>Follow</h4>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.9 6.3a7.3 7.3 0 0 1-2 .6 3.5 3.5 0 0 0 1.5-2 7 7 0 0 1-2.2.9 3.5 3.5 0 0 0-6 3.2A10 10 0 0 1 3 5.6a3.5 3.5 0 0 0 1.1 4.6c-.6 0-1.1-.2-1.6-.4 0 1.7 1.2 3.1 2.8 3.4-.5.2-1 .2-1.6.1A3.5 3.5 0 0 0 7 15.7a7 7 0 0 1-5.2 1.5A10 10 0 0 0 18.9 8.7v-.5a7 7 0 0 0 1.7-1.8 7 7 0 0 1-2 .5 3.5 3.5 0 0 0 .3-.6Z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} Pizza Co. All rights reserved.</span>
        <span>Made with love in the wood-fired oven</span>
      </div>
    </footer>
  )
}
