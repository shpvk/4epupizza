export const PIZZA_FALLBACK_IDS_BY_NAME = {
  'Meat Pizza': 1,
  'Veggie Pizza': 2,
  'Seafood Pizza': 3,
  'Mushroom Pizza': 4,
  'Meat Pizza 2': 5,
  'Spicy Pizza': 6,
  'Hawaiian Pizza': 7,
  Margherita: 8,
  'Four Cheeses': 9,
  'BBQ Chicken': 10,
  Pepperoni: 11,
  'Truffle Mushroom': 12,
  'Salmon Delight': 13,
  Diablo: 14,
  'Vegan Paradise': 15,
  Carbonara: 16,
}

export function getPizzaFallbackId(name) {
  return PIZZA_FALLBACK_IDS_BY_NAME[String(name || '').trim()] || 0
}
