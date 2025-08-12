import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/JavaScript/Navbar";
import BASE from "../constants/api";

const Category = () => {
  const { Category: categoryParam } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    axios
      .post(`${BASE}/SearchResults`, { query: categoryParam })
      .then((response) => {
        setData(response.data.result || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again.");
        setIsLoading(false);
      });
  }, [categoryParam]);

  const handleProductClick = (item) => {
    navigate(`/productdetails/${item.id}`);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          <span className="border-b-4 border-indigo-600 pb-1">
            {categoryParam} Products
          </span>
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-52 gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-dashed rounded-full border-gray-400 animate-spin" />
            <p className="text-base text-gray-700">
              Loading <strong>{categoryParam}</strong> products...
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No products found for <strong>{categoryParam}</strong>.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((item) => (
              <button
                key={item.id}
                onClick={() => handleProductClick(item)}
                className="relative bg-white shadow hover:shadow-lg transition duration-300 rounded-xl overflow-hidden flex flex-col cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`View details for ${item.title}`}
                data-aos="zoom-in"
              >
                <div className="w-full aspect-square bg-gray-100 flex justify-center items-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain h-36 w-36 transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  {console.log(item.image)}
                </div>
                <div className="px-4 py-3 flex-1 flex flex-col items-start w-full">
                  <h4 className="text-md font-semibold text-gray-900 truncate w-full mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {item.description?.substring(0, 60) || ""}
                    {item.description && item.description.length > 60
                      ? "..."
                      : ""}
                  </p>
                  <p className="mt-auto text-base">
                    <span className="font-semibold text-indigo-600">
                      ${item.price?.toFixed(2)}
                    </span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Category;
