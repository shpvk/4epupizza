import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import MostPopular from './components/MostPopular.jsx'
import Events from './components/Events.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <MostPopular />
        <Events />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App
