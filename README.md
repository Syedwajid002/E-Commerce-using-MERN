# E-Commerce using MERN

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates a modern online shopping experience with user authentication, product browsing, cart management, and checkout functionality.

## Features

- User authentication (signup, login, logout)
- Product listing and details
- Search and category filtering
- Shopping cart and checkout
- Responsive UI with Tailwind CSS
- RESTful API backend

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Project Structure

```
E-Commerce-using-MERN/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── Components/    # Reusable components
│   │   ├── Pages/         # Page components (Home, Login, Signup, etc.)
│   │   ├── constants/     # API endpoints
│   │   └── Images/        # Static images
│   └── public/            # Static public assets
│
├── server/                # Express backend
│   ├── models/            # Mongoose models
│   ├── Routes/            # API routes
│   └── index.js           # Entry point
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Syedwajid002/E-Commerce-using-MERN.git
   cd E-Commerce-using-MERN
   ```

2. **Install server dependencies:**

   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**

   ```sh
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the `server` directory with your MongoDB URI and any other secrets.

5. **Start the backend server:**

   ```sh
   cd ../server
   npm start
   ```

6. **Start the frontend React app:**

   ```sh
   cd ../client
   npm start
   ```

7. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Details

- `client/src/Components/JavaScript/` - Navbar, Footer, Body, etc.
- `client/src/Pages/` - Home, Login, Signup, Cart, Product Details, etc.
- `server/models/` - Mongoose schemas for User, Product, Cart
- `server/Routes/` - Express route handlers for authentication, products, cart, etc.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
