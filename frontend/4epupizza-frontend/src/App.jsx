import './App.css'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Login/ForgotPassword'
import SignUp from './pages/Login/SignUp'
import PizzaConstructorPage from './components/constructor/PizzaConstructorPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/constructor" element={<PizzaConstructorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
