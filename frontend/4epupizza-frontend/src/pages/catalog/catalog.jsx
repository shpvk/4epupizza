import { useState, useEffect } from "react";
import "./catalog.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Card from "../../components/pizzacard/pizzacard";

const dummyPizzas = [
  {
    name: "Meat Pizza",
    price: 8.35,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 1,
    ingredients: [{ name: "onion" }, { name: "meat" }],
  },
  {
    name: "Veggie Pizza",
    price: 7.5,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 2,
    ingredients: [{ name: "onion" }, { name: "tomato" }],
  },
  {
    name: "Seafood Pizza",
    price: 9.2,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 3,
    ingredients: [{ name: "prawns" }],
  },
  {
    name: "Mushroom Pizza",
    price: 8.0,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 4,
    ingredients: [{ name: "mushrooms" }],
  },
  {
    name: "Meat Pizza 2",
    price: 8.5,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 1,
    ingredients: [{ name: "onion" }, { name: "meat" }, { name: "bacon" }],
  },
  {
    name: "Spicy Pizza",
    price: 9.0,
    imageUrl: "/img/pizzaphoto.png",
    categoryId: 1,
    ingredients: [{ name: "jalapeno" }, { name: "pepperoni" }],
  },
];

const categories = [
  { id: null, name: "Все" },
  { id: 1, name: "Мясо" },
  { id: 2, name: "Вегетарианские" },
  { id: 3, name: "Морепродукты" },
  { id: 4, name: "Грибные" },
];

function Catalog() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("default"); // default, price-asc, price-desc

  useEffect(() => {
    fetch("https://fourepupizza.onrender.com/api/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке пицц:", err);
        setLoading(false);
      });
  }, []);

  const displayPizzas = pizzas.length > 0 ? pizzas : dummyPizzas;

  let filteredPizzas = selectedCategory
    ? displayPizzas.filter((pizza) => pizza.categoryId === selectedCategory)
    : [...displayPizzas];

  if (sortOrder === "price-asc") {
    filteredPizzas.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filteredPizzas.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog-page-wrapper">
      <Header />

      <main className="catalog-content">
        <div className="catalog-container">
          <h1 className="catalog-title">Каталог пицц</h1>

          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <div className="catalog-controls">
                <div className="catalog-filters">
                  {categories.map((cat) => (
                    <button
                      key={cat.id || "all"}
                      className={`filter-btn ${selectedCategory === cat.id ? "active-filter" : ""}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="catalog-main">
              <div className="catalog-main-header">
                <div className="catalog-sort">
                  <select
                    id="sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="default">Сортировка: По умолчанию</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="catalog-loading">Загрузка...</div>
              ) : (
                <div className="catalog-grid">
                  {filteredPizzas.length > 0 ? (
                    filteredPizzas.map((pizza, index) => (
                      <Card key={pizza.id || index} pizza={pizza} />
                    ))
                  ) : (
                    <div className="catalog-empty">Пиццы не найдены</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Catalog;
