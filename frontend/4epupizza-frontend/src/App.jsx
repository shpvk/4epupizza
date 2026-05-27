import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import CheckoutPage from './components/checkout/CheckoutPage'

function App() {
  const isCheckoutPage = window.location.pathname === '/checkout'

  return (
    <>
      <Header />
      <main>
        {isCheckoutPage && <CheckoutPage />}
      </main>
      <Footer />
    </>
  )
}

export default App
