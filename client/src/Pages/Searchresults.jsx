import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/JavaScript/Navbar";
import BASE from "../constants/api";

const Searchresults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${BASE}/SearchResults`, { query });
        setResults(response.data.result || []);
        setIsLoading(false);
      } catch (error) {
        setResults([]);
        setIsLoading(false);
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  const productclick = (item) => {
    navigate(`/productdetails/${item.id}`);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link
                to="/AllProducts"
                className="hover:text-indigo-600 transition"
              >
                Products
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="font-semibold text-gray-900 truncate max-w-xs">
              {query}
            </li>
          </ol>
        </nav>

        <h2 className="text-center text-3xl font-bold mb-6">
          <span className="border-b-4 border-indigo-600 pb-1">
            Searched Products
          </span>
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-56 gap-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-dashed rounded-full border-gray-400 animate-spin" />
            <p className="text-gray-700">
              Loading <strong>{query}</strong> products, please wait...
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => productclick(item)}
                className="relative bg-white shadow hover:shadow-lg transition duration-300 rounded-xl overflow-hidden flex flex-col cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`View details for ${item.title}`}
                data-aos="fade-up"
                data-aos-duration="700"
              >
                <div className="w-full aspect-square bg-gray-100 flex justify-center items-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain h-36 w-36 transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3 flex flex-col items-start w-full">
                  <h4 className="text-md font-semibold text-gray-900 truncate w-full mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {item.description?.substring(0, 60)}
                    {item.description && item.description.length > 60
                      ? "..."
                      : ""}
                  </p>
                  <p className="mt-auto text-base">
                    <span className="font-semibold text-indigo-600">
                      $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : item.price}
                    </span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-16">
            No products found for <strong>{query}</strong>.
          </div>
        )}
      </main>
    </>
  );
};

export default Searchresults;
