import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/header'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <div className="login-page">
      <Header />
      <div className="login-card">
        <div className="login-card__body">
          <h1 className="login-card__title">З поверненням</h1>
          <p className="login-card__subtitle">Увійдіть, щоб продовжити замовлення.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="login-email">
                Електронна пошта
              </label>
              <input
                id="login-email"
                className="login-form__input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="login-form__group">
              <div className="login-form__row">
                <label className="login-form__label" htmlFor="login-password">
                  Пароль
                </label>
                <Link className="login-form__forgot" to="/forgot-password">
                  Забули пароль?
                </Link>
              </div>
              <input
                id="login-password"
                className="login-form__input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button id="login-submit" className="login-form__btn" type="submit">
              Увійти →
            </button>
          </form>
          <p className="login-card__signup">
            Немає акаунта?{' '}
            <Link className="login-card__signup-link" to="/signup">
              Зареєструватися
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
