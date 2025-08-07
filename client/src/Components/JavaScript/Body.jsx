import React, { useRef } from "react";
import BoxesScroll from "./BoxesScroll";
import { Link, useNavigate } from "react-router-dom";

function Body() {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const scrollToComponent = () => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/Products/men`);
      }
    }, 100);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen relative overflow-hidden">
      {/* Decorative Background Blob */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-purple-800 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 rounded-full opacity-10 blur-2xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-20 gap-10">
        {/* Text Content */}
        <div
          className="space-y-4 text-center md:text-left max-w-xl"
          data-aos="zoom-out"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Shop Smart, Live Better
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Discover unbeatable deals for this winter season. Stylish, smart,
            and up to{" "}
            <span className="text-yellow-400 font-semibold">50% OFF</span>.
          </p>
          <button
            onClick={scrollToComponent}
            className="mt-6 px-7 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:shadow-yellow-300 transition-all duration-300 animate-bounce"
          >
            🛍️ Shop Now
          </button>
        </div>

        {/* Image or Illustration */}
        <div className="w-full md:w-1/2" data-aos="zoom-in">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-shopping-sale-4001621-3307800.png"
              alt="Shopping Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <ul className="md:hidden flex justify-around items-center bg-slate-800 text-white py-4 border-t border-slate-700 text-sm font-semibold shadow-lg z-20">
        <Link to="/Products/men">
          <li className="hover:text-yellow-400 transition-all">Mens</li>
        </Link>
        <Link to="/Products/women">
          <li className="hover:text-yellow-400 transition-all">Womens</li>
        </Link>
        <Link to="/Products/jewelery">
          <li className="hover:text-yellow-400 transition-all">Jewellery</li>
        </Link>
        <Link to="/Products/electronics">
          <li className="hover:text-yellow-400 transition-all">Electronics</li>
        </Link>
      </ul>

      {/* Product Grid Section */}
      <BoxesScroll ref={targetRef} />
    </div>
  );
}

export default Body;
