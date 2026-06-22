import "./Recomend.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../pizzacard/pizzacard";
const dummyPizzas = [
  {
    name: "Meat Pizza",
    price: 210,
    imageUrl:
      "https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/pizzas/pizza_default.png",
    categoryId: 1,
    ingredients: [{ name: "onion" }, { name: "meat" }],
  },
  {
    name: "Veggie Pizza",
    price: 190,
    imageUrl:
      "https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/pizzas/Veggie.png",
    categoryId: 2,
    ingredients: [{ name: "onion" }, { name: "tomato" }],
  },
  {
    name: "Seafood Pizza",
    price: 300,
    imageUrl:
      "https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/pizzas/sea_pizza.png",
    categoryId: 3,
    ingredients: [{ name: "prawns" }],
  },
  {
    name: "Mushroom Pizza",
    price: 250,
    imageUrl:
      "https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/pizzas/mushrooms_pizza.png",
    categoryId: 4,
    ingredients: [{ name: "mushrooms" }],
  },
  {
    name: "Meat Pizza1",
    price: 290,
    imageUrl:
      "https://zcncvckglgttnjwrwuuc.supabase.co/storage/v1/object/public/pizza-images/pizzas/meat_pizza.png",
    categoryId: 3,
    ingredients: [{ name: "onion" }, { name: "meat" }],
  },
];

function Recomend() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // null означает "Все"

  useEffect(() => {
    // Отправляем запрос на порт бэкенда (5286)
    fetch("http://localhost:5286/api/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data); // Сохраняем полученные из БД пиццы
        setLoading(false); // Выключаем индикатор загрузки
      })
      .catch((err) => {
        console.error("Ошибка при загрузке пицц:", err);
        setLoading(false);
      });
  }, []);

  const displayPizzas = pizzas.length > 0 ? pizzas : dummyPizzas;

  const filteredPizzas = selectedCategory
    ? displayPizzas.filter((pizza) => pizza.categoryId === selectedCategory)
    : displayPizzas;

  return (
    <main>
      <div className="rec-container">
        <div className="main-text">Рекомендации</div>
        <nav className="buttons-cont">
          <a
            href="#"
            className={selectedCategory === null ? "active-cat" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(null);
            }}
          >
            Все
          </a>
          <a
            href="#"
            className={selectedCategory === 1 ? "active-cat" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(1);
            }}
          >
            Мясо
          </a>
          <a
            href="#"
            className={selectedCategory === 2 ? "active-cat" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(2);
            }}
          >
            Вегетарианские
          </a>
          <a
            href="#"
            className={selectedCategory === 3 ? "active-cat" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(3);
            }}
          >
            Море продукты
          </a>
          <a
            href="#"
            className={selectedCategory === 4 ? "active-cat" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory(4);
            }}
          >
            Грибные
          </a>
        </nav>
        <div className="pizza-grid">
          {filteredPizzas.slice(0, 4).map((pizza, index) => (
            <Card key={pizza.id || index} pizza={pizza} />
          ))}
        </div>
        <div className="moore-btn">
          <Link to="/catalog">
            {selectedCategory === 1 && "Больше мясных пицц"}
            {selectedCategory === 2 && "Больше вегетарианских пицц"}
            {selectedCategory === 3 && "Больше пицц с морепродуктами"}
            {selectedCategory === 4 && "Больше грибных пицц"}
            {selectedCategory === null && "Каталог пицц"}
          </Link>
        </div>
        <div className="main-text">Популярные</div>
        <div className="pizza-grid">
          {filteredPizzas.slice(0, 4).map((pizza, index) => (
            <Card key={pizza.id || index} pizza={pizza} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Recomend;
