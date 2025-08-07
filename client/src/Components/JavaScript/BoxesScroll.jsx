import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../constants/api";

const BoxesScroll = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [showAltText, setShowAltText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE}/getProducts`)
      .then((response) => {
        setisLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setisLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setShowAltText((prev) => !prev);
      }, 2000);

      return () => clearInterval(interval); // Cleanup on unmount or when isLoading becomes false
    }
  }, [isLoading]);

  const handleProductClick = (item) => {
    navigate(`/productdetails/${item.id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40 gap-3 animate-pulse">
          <div className="w-12 h-12 border-4 border-dashed rounded-full border-gray-400 animate-spin" />
          <p className="text-base text-white">
            Server is Slow Loading products, please wait...(30 seconds)
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full p-4"
          ref={ref}
        >
          {data.map((item) => (
            <button
              key={item.id}
              type="button"
              className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col items-center cursor-pointer group focus:ring-2 focus:ring-indigo-500"
              onClick={() => handleProductClick(item)}
              aria-label={`View details for ${item.title}`}
              data-aos="zoom-in"
            >
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title || "Product Image"}
                  className="object-contain h-36 w-36 transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 flex flex-col items-center w-full">
                <h4 className="text-lg font-semibold text-gray-900 truncate w-full">
                  {item.title}
                </h4>
                {/* Add more product info if you like, e.g., price, rating */}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
});

export default BoxesScroll;
