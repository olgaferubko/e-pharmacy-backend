# E-Pharmacy Backend

The backend for E-Pharmacy, built with Node.js, Express and MongoDB.
Implements user authentication, shopping cart, checkout and order management.

## Technologies

- Node.js, Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt, cookie-parser, cors, dotenv

## Setup

```bash
npm install
npm run dev
```

## API Routes

### Auth

- POST /api/user/register — register a user
- POST /api/user/login — log in
- GET /api/user/refresh — refresh token
- POST /api/user/logout — log out

### Cart

- GET /api/cart — get user cart
- PUT /api/cart/update — update cart
- POST /api/cart/checkout — checkout and create order

### Products

- GET /api/products — get all products
- GET /api/products/:id — get product by ID

---

**Server**: https://e-pharmacy-backend-bad9.onrender.com
