import './App.css'
import Header from './components/header/header'
<<<<<<< Updated upstream
=======
import Footer from './components/footer/footer'
import CheckoutPage from './components/checkout/CheckoutPage'
>>>>>>> Stashed changes

function App() {
  const isCheckoutPage = window.location.pathname === '/checkout'

  return (
    <>
      <Header />
<<<<<<< Updated upstream
=======
      <main>
        {isCheckoutPage && <CheckoutPage />}
      </main>
      <Footer />
>>>>>>> Stashed changes
    </>
  )
}

export default App
