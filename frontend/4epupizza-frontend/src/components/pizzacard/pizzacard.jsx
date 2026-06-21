import { useState } from "react";
import "./Pizzacard.css";

function PizzaCard({ pizza }) {
  const [selectedSize, setSelectedSize] = useState(28);
  const [quantity, setQuantity] = useState(1);

  const basePrice = pizza.price;
  const sizePrices = {
    22: Number((basePrice - 2.0).toFixed(2)),
    28: basePrice,
    33: Number((basePrice + 2.0).toFixed(2)),
  };
  const currentPrice = sizePrices[selectedSize];

  const ingredientsText =
    pizza.ingredients && pizza.ingredients.length > 0
      ? "Состав: " + pizza.ingredients.map((ing) => ing.name).join(", ")
      : "Состав классический";

  return (
    <div className="cart-cont">
      <div className="pizza-image-container">
        <img
          src={pizza.imageUrl || "/img/pizza-italian.png"}
          alt={pizza.name}
          className="pizza-image"
        />
      </div>
      <h3 className="pizza-title">{pizza.name}</h3>
      <p className="pizza-ingredients">{ingredientsText}</p>
      <div className="pizza-sizes">
        {[22, 28, 33].map((size) => (
          <button
            key={size}
            className={`size-btn ${selectedSize === size ? "active" : ""}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <button className="ingredients-btn">+ Ingredients</button>
      <div className="pizza-footer">
        <div className="pizza-price">
          {currentPrice} <span className="currency">$</span>
        </div>
        <div className="pizza-counter">
          <button
            className="counter-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="counter-value">{quantity}</span>
          <button
            className="counter-btn plus"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button className="order-btn">Order Now</button>
    </div>
  );
}
export default PizzaCard;
