import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/JavaScript/Navbar";
import BASE from "../constants/api";

const Productdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${BASE}/ProductsDetails/${id}`).then((res) => {
      setProduct(res.data.result);
    });
  }, [id]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    const productId = product.id;
    const userId = localStorage.getItem("id");
    axios
      .post(`${BASE}/addtocart`, { productId, userId })
      .then(() => navigate(`/Mycart/${userId}`))
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const handleBuyNow = () => {
    if (!localStorage.getItem("isLoggedIn")) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    axios.post(`${BASE}/buynow`, { id: product.id }).then(() => {
      console.log("Order placed");
    });
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading product details...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Image */}
        <div className="col-span-5">
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-6"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-span-7">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Price */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price}
            </span>
            <span className="text-gray-400 line-through text-lg">
              ${(product.price + 100).toFixed(2)}
            </span>
          </div>

          {/* Category */}
          <p className="mb-6 text-sm">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={decrement}
                className="w-10 h-10 text-xl bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                onClick={increment}
                className="w-10 h-10 text-xl bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <p className="text-lg">
              Total: ${(product.price * quantity).toFixed(2)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Reviews */}
          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-semibold mb-1">Customer Reviews</h3>
            <p className="text-yellow-500">⭐ 4.2 / 5</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productdetails;
