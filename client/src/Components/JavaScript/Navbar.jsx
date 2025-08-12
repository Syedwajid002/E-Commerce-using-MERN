import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // For mobile menu icons
import cartImage from "../../Images/shopping-cart.png";
import axios from "axios";
import BASE from "../../constants/api";

function Navbar() {
  const navigate = useNavigate();
  const [searchdata, setSearchData] = useState("");
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(134);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const getstatus = localStorage.getItem("isLoggedIn");
    if (getstatus === "true") {
      setAuth(true);
      setId(localStorage.getItem("id"));
      setName(localStorage.getItem("username"));
    } else {
      setAuth(false);
      setId(404);
      setName("");
    }
  }, []);

  const handleChange = (e) => setSearchData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchdata.trim()) {
      navigate(`/searched/${searchdata.trim()}`);
      setMobileMenu(false); // Close menu on search
    }
  };

  const Logout = async () => {
    await axios.post(`${BASE}/logout`);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    setAuth(false);
    setName("");
    navigate("/");
  };

  const menuItems = [
    { label: "Mens", path: "/Products/men" },
    { label: "Womens", path: "/Products/women" },
    { label: "Electronics", path: "/Products/electronics" },
    { label: "Jewelery", path: "/Products/jewelery" },
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50">
      <nav
        className="
          max-w-7xl mx-auto px-4 md:px-8
          flex items-center justify-between h-16 gap-2
          bg-white/10 backdrop-blur-md
          border-b border-white/30 shadow-xl
          dark:bg-neutral-900/60
          border-0 rounded-lg mt-2
        "
        style={{ boxShadow: "0 4px 32px 0 rgba(80, 50, 130, 0.03)" }}
      >
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold flex items-center gap-1.5 text-white drop-shadow-md hover:text-pink-300 tracking-tight"
        >
          <span>Online</span>
          <span className="text-orange-300">Shop</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-3">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="text-base font-medium px-3 py-1 rounded-lg hover:bg-white/20 hover:text-pink-200 text-white transition cursor-pointer"
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>

        {/* Search Bar - Desktop */}
        <form
          className="hidden sm:flex items-center rounded-full bg-white/70 backdrop-blur px-2 py-1 mx-2 shadow-sm"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            placeholder="Search products"
            aria-label="Search"
            name="searchbar"
            className="outline-none bg-transparent px-2 w-28 sm:w-40 text-gray-900 text-sm placeholder-gray-500"
            value={searchdata}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-1.5 rounded-full ml-2 transition"
          >
            Search
          </button>
        </form>

        {/* Cart & Auth - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className="group relative"
            onClick={() => navigate(`/Mycart/${id}`)}
            aria-label="My cart"
          >
            <img
              src={cartImage}
              alt="Shopping cart"
              className="w-7 h-7 object-contain group-hover:scale-110 transition-all drop-shadow-xl"
            />
          </button>

          {auth ? (
            <>
              <span className="text-white text-base font-semibold hidden md:inline drop-shadow">
                {name}!
              </span>
              <button
                className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-shadow shadow-md"
                onClick={Logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-indigo-600 hover:bg-pink-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-shadow shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-neutral-900/90 backdrop-blur text-white p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block py-2 border-b border-white/20"
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Search Bar - Mobile */}
          <form
            className="flex items-center rounded-full bg-white/70 backdrop-blur px-2 py-1 mx-2 shadow-sm"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              placeholder="Search products"
              aria-label="Search"
              name="searchbar"
              className="outline-none bg-transparent px-2 w-full text-gray-900 text-sm placeholder-gray-500"
              value={searchdata}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-1.5 rounded-full ml-2 transition"
            >
              Search
            </button>
          </form>

          {/* Cart & Auth - Mobile */}
          <div className="flex flex-col gap-3 mt-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-indigo-700 px-4 py-2 rounded-lg"
              onClick={() => {
                navigate(`/Mycart/${id}`);
                setMobileMenu(false);
              }}
            >
              <img src={cartImage} alt="Cart" className="w-6 h-6" />
              <span>My Cart</span>
            </button>

            {auth ? (
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                onClick={() => {
                  Logout();
                  setMobileMenu(false);
                }}
              >
                Logout ({name})
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="bg-indigo-600 hover:bg-pink-600 px-4 py-2 rounded-lg w-full"
                  onClick={() => setMobileMenu(false)}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
