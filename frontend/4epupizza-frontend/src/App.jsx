import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/header/header'
import AboutUs from './components/AboutUs/AboutUs'

function App() {
  if (window.location.pathname === '/about') {
    return (
      <>
        <Header />
        <AboutUs />
      </>
    )
  }

  return (
    <>
      <Header />
    </>
  )
}

export default App
