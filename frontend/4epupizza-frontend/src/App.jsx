import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import PizzaConstructorPage from './components/constructor/PizzaConstructorPage'

function App() {
  const currentPath = window.location.pathname
  const isConstructorPage = currentPath === '/constructor'

  return (
    <>
      <Header />
      <main>
        {isConstructorPage && <PizzaConstructorPage />}
      </main>
      <Footer />
    </>
  )
}

export default App
