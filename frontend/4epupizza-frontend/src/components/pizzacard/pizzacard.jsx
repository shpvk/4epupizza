import { useState } from "react";
import "./Pizzacard.css";
import { useCart } from "../../context/CartContext";
import IngredientsDrawer from "./IngredientsDrawer";

function PizzaCard({ pizza }) {
  const [selectedSize, setSelectedSize] = useState(28);
  const [quantity, setQuantity] = useState(1);
  const [isIngredientsMenuOpen, setIsIngredientsMenuOpen] = useState(false);
  const [extraIngredients, setExtraIngredients] = useState([]);
  const { addItem } = useCart();

  const basePrice = pizza.price;
  const sizePrices = {
    22: Number((basePrice - 2.0).toFixed(2)),
    28: basePrice,
    33: Number((basePrice + 2.0).toFixed(2)),
  };
  const extrasPrice = extraIngredients.reduce((sum, ing) => sum + (ing.price || 0), 0);
  const currentPrice = Number((sizePrices[selectedSize] + extrasPrice).toFixed(2));

  const allIngredients = [
    ...(pizza.ingredients || []),
    ...extraIngredients
  ];

  const ingredientsText =
    allIngredients.length > 0
      ? "Состав: " + allIngredients.map((ing) => ing.name).join(", ")
      : "Состав классический";

  const handleOrder = () => {
    const extrasId = extraIngredients.map(ing => ing.id).sort().join('-');
    
    let finalDescription = pizza.ingredients && pizza.ingredients.length > 0 
      ? pizza.ingredients.map((ing) => ing.name).join(", ") 
      : "Классическая";
    
    if (extraIngredients.length > 0) {
      const extraNames = extraIngredients.map(ing => ing.name);
      finalDescription += " | Добавки: " + extraNames.join(", ");
    }

    addItem({
      id: `${pizza.id || pizza.name}-${selectedSize}${extrasId ? `-${extrasId}` : ''}`,
      name: pizza.name,
      description: finalDescription,
      price: currentPrice,
      size: selectedSize,
      imageUrl: pizza.imageUrl || "/img/pizza-italian.png",
      quantity: quantity,
      extraIngredients: extraIngredients
    });
  };

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
      <button 
        className="ingredients-btn" 
        onClick={() => setIsIngredientsMenuOpen(true)}
      >
        + Ingredients
      </button>
      <div className="pizza-footer">
        <div className="pizza-price">
          {currentPrice} <span className="currency">₴</span>
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
      <button className="order-btn" onClick={handleOrder}>
        Order Now
      </button>
      
      <IngredientsDrawer 
        isOpen={isIngredientsMenuOpen}
        onClose={() => setIsIngredientsMenuOpen(false)}
        onSave={(extras) => setExtraIngredients(extras)}
        initialExtras={extraIngredients}
      />
    </div>
  );
}
export default PizzaCard;
