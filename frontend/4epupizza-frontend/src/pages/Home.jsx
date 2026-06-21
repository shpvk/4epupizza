import "./Home.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Main from "../components/Main/Main";
import Recomend from "../components/Main/Recomend";
import Events from "../components/Main/events";
import About from "../components/Main/aboutus";
function Home() {
  return (
    <>
      <Header />
      <Main />
      <Recomend />
      <Events />
      <About />
      <Footer />
    </>
  );
}

export default Home;
