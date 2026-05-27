import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import CheckoutPage from './components/checkout/CheckoutPage'
import PizzaConstructorPage from './components/constructor/PizzaConstructorPage'

function App() {
  const currentPath = window.location.pathname
  const isCheckoutPage = currentPath === '/checkout'
  const isConstructorPage = currentPath === '/constructor'

  return (
    <>
      <Header />
      <main>
        {isCheckoutPage && <CheckoutPage />}
        {isConstructorPage && <PizzaConstructorPage />}
      </main>
      <Footer />
    </>
  )
}

export default App
