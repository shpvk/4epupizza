# ChepuPizza Backend

Backend for a pizza ordering and pizza builder application built with ASP.NET Core Web API.

## Features

* Pizza catalog
* Ingredient catalog
* Custom pizza builder
* Price calculation based on selected ingredients
* PostgreSQL database
* Entity Framework Core
* Swagger/OpenAPI documentation
* Supabase Storage integration for ingredient images

---

## Architecture

The project follows a classic 3-layer architecture:

```txt
ChepuPizza.API
        ↓
ChepuPizza.BLL
        ↓
ChepuPizza.DAL
        ↓
PostgreSQL (Supabase)
```

### API Layer (ChepuPizza.API)

Responsible for handling HTTP requests and responses.

Contains:

* PizzaController
* IngredientController
* PizzaBuilderController

Responsibilities:

* Receive HTTP requests
* Validate route parameters
* Return HTTP responses
* Delegate business logic to services

---

### Business Logic Layer (ChepuPizza.BLL)

Contains business rules and DTO mapping.

Contains:

#### Services

* PizzaService
* IngredientService
* PizzaBuilderService

#### DTOs

Requests:

* PizzaRequest
* PizzaBuilderRequest

Responses:

* PizzaResponse
* IngredientResponse
* PizzaBuilderResponse

Responsibilities:

* Business validation
* Price calculation
* Entity-to-DTO mapping
* Coordination of repositories

---

### Data Access Layer (ChepuPizza.DAL)

Responsible for database communication.

Contains:

#### Data

* AppDbContext
* Entity configurations

#### Repositories

* PizzaRepository
* IngredientRepository

#### Entities

* Pizza
* Ingredient
* PizzaIngredient

Responsibilities:

* Querying the database
* Saving entities
* Entity Framework Core configuration

---

## Database Design

### Pizza

Represents a pizza.

Fields:

* Id
* Name
* Price
* IsAvailable

Relations:

```txt
Pizza
  ↓
PizzaIngredients
  ↓
Ingredient
```

---

### Ingredient

Represents a pizza ingredient.

Fields:

* Id
* Name
* Price
* IsAvailable
* ImageUrl
* Category

Categories:

```txt
Cheese
Sausage
Mushroom
Sauce
```

---

### PizzaIngredient

Many-to-many relationship table.

Fields:

* PizzaId
* IngredientId

Example:

```txt
Pizza #1
 ├── Mozzarella
 ├── Pepperoni
 └── Tomato Sauce
```

---

## API Endpoints

### Pizzas

Get all pizzas:

```http
GET /api/pizzas
```

Get pizza by id:

```http
GET /api/pizzas/{pizzaId}
```

Create pizza:

```http
POST /api/pizzas
```

Request:

```json
{
  "name": "Pepperoni",
  "price": 229,
  "ingredientIds": [1, 3, 10]
}
```

---

### Ingredients

Get all ingredients:

```http
GET /api/ingredients
```

Get ingredient by id:

```http
GET /api/ingredients/{ingredientId}
```

---

### Pizza Builder

Calculate custom pizza price without saving it.

```http
POST /api/pizza-builder/calculate
```

Request:

```json
{
  "ingredientIds": [1, 3, 10]
}
```

Response:

```json
{
  "totalPrice": 110,
  "ingredients": [
    {
      "id": 1,
      "name": "Mozzarella",
      "price": 35,
      "category": "Cheese",
      "imageUrl": "https://..."
    }
  ]
}
```

---

## Request Flow

Example:

```txt
Client
  ↓
PizzaController
  ↓
PizzaService
  ↓
PizzaRepository
  ↓
AppDbContext
  ↓
PostgreSQL
```

---

## Technologies

### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* LINQ
* Dependency Injection

### Database

* PostgreSQL
* Supabase PostgreSQL

### Documentation

* Swagger

### PostgreSQL Database

The application uses Supabase PostgreSQL as the primary database.

Stored data:

* Pizzas
* Ingredients
* PizzaIngredients

### Storage

Ingredient images are stored in Supabase Storage.
---

## Future Improvements

* Authentication & Authorization (JWT)
* Orders
* Shopping Cart
* User Accounts
* Caching
* Unit Tests
* Docker Support
* CI/CD Pipeline
* Admin Panel

---

Project created for learning ASP.NET Core Web API, Entity Framework Core, PostgreSQL, and software architecture principles.
