import './App.css'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import PizzaConstructorPage from './components/constructor/PizzaConstructorPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/constructor" element={<PizzaConstructorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
