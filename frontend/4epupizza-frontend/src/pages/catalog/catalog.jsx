import "./catalog.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Catalog() {
  return (
    <div className="catalog-page-wrapper">
      <Header />
      
      <main className="catalog-content">
        {/* Здесь будут товары каталога */}
      </main>

      <Footer />
    </div>
  );
}
export default Catalog;
