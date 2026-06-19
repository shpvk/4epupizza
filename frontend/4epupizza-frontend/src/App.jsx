import './App.css'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Login/ForgotPassword'
import SignUp from './pages/Login/SignUp'
import Promotions from './pages/Promotions'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import PizzaConstructorPage from './components/constructor/PizzaConstructorPage'
import { preloadIngredients } from './components/constructor/useIngredients'
import { CartProvider } from './context/CartContext'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  useEffect(() => {
    preloadIngredients().catch(() => {
      // The constructor page will show an error if there is no cached data.
    })
  }, [])

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/constructor" element={<PizzaConstructorPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
