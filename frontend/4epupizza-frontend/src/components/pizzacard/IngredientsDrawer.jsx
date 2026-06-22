import { useState, useEffect } from 'react';
import { useIngredients } from '../constructor/useIngredients';
import './IngredientsDrawer.css';

function IngredientsDrawer({ isOpen, onClose, onSave, initialExtras = [] }) {
  const { ingredients, isLoading, loadError } = useIngredients();
  const [selectedExtras, setSelectedExtras] = useState(initialExtras);

  // Синхронизация при открытии
  useEffect(() => {
    if (isOpen) {
      setSelectedExtras(initialExtras);
    }
  }, [isOpen, initialExtras]);

  const toggleIngredient = (ingredient) => {
    const isSelected = selectedExtras.some((ex) => ex.id === ingredient.id);
    if (isSelected) {
      setSelectedExtras(selectedExtras.filter((ex) => ex.id !== ingredient.id));
    } else {
      setSelectedExtras([...selectedExtras, ingredient]);
    }
  };

  const handleSave = () => {
    onSave(selectedExtras);
    onClose();
  };

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`ingredients-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Добавить ингредиенты</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="drawer-content">
          {isLoading && <p className="loading-text">Загрузка...</p>}
          {loadError && <p className="error-text">{loadError}</p>}
          {!isLoading && !loadError && (
            <div className="ingredients-list">
              {ingredients.map((ing) => {
                const isSelected = selectedExtras.some((ex) => ex.id === ing.id);
                return (
                  <div key={ing.id} className="ingredient-item">
                    <div className="ing-img-container">
                      {ing.imageUrl && <img src={ing.imageUrl} alt={ing.name} className="ing-img" />}
                    </div>
                    <div className="ing-info">
                      <span className="ing-name">{ing.name}</span>
                      <span className="ing-price">+{ing.price} ₴</span>
                    </div>
                    <button 
                      className={`add-ing-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleIngredient(ing)}
                    >
                      {isSelected ? '✓' : '+'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="drawer-footer">
          <button className="save-btn" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </>
  );
}

export default IngredientsDrawer;
