import './Header.css'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#" className="site-header__logo">
          <span className="logo-mark">P</span>
          <span className="logo-text">Pizza<span>.</span></span>
        </a>

        <nav className="site-nav">
          <ul>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#popular">Popular</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <button className="cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-btn__count">2</span>
          </button>
        </div>
      </div>
    </header>
  )
}
