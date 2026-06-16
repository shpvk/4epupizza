import { Link } from 'react-router-dom'
import Header from '../../components/header/header'
import './Login.css'

function SignUp() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-card">
        <div className="login-card__body">
          <h1 className="login-card__title">Створити акаунт</h1>
          <p className="login-card__subtitle">Зареєструйтеся, щоб швидше оформлювати замовлення.</p>

          <form className="login-form" noValidate>
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="signup-name">
                Ім'я
              </label>
              <input id="signup-name" className="login-form__input" type="text" autoComplete="name" required />
            </div>
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="signup-email">
                Електронна пошта
              </label>
              <input id="signup-email" className="login-form__input" type="email" autoComplete="email" required />
            </div>
            <div className="login-form__group">
              <label className="login-form__label" htmlFor="signup-password">
                Пароль
              </label>
              <input
                id="signup-password"
                className="login-form__input"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
            <button className="login-form__btn" type="submit">
              Зареєструватися →
            </button>
          </form>

          <p className="login-card__signup">
            Вже маєте акаунт?{' '}
            <Link className="login-card__signup-link" to="/login">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
