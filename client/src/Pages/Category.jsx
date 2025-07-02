import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./../Components/Styles/BoxesScroll.css";
import Navbar from "../Components/JavaScript/Navbar";
import BASE from "../constants/api";
const Category = () => {
  const { Category } = useParams();
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Category);
    axios
      .post(`${BASE}/SearchResults`, { query: Category })
      .then((response) => {
        setisLoading(false);
        setData(response.data.result);
      })
      .catch((err) => {
        console.log("Error Category me" + err);
      });
  }, [Category]);

  const productclick = (item) => {
    navigate(`/productdetails/${item.id}`);
  };

  return (
    <>
      <Navbar />
      <h2 className="flex items-center place-content-center text-2xl font-bold">
        <u>Searched Products</u>
      </h2>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40 space-y-2 animate-pulse ">
          <div className="w-10 h-10 border-4 border-dashed rounded-full border-gray-400 animate-spin"></div>
          <p className="text-sm text-black">
            Loading {Category} Products please wait...
          </p>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-4 w-full p-2.5 justify-center text-cente">
          {data &&
            data.map((item) => (
              <div
                data-aos="fade-out"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="500"
              >
                <div
                  className="md:flex-col justify-center content-center mb-5 bg-white mr-2.5 w-72 h-72 text-center border-2 border-l-2 border-black rounded-lg  hover:scale-110 transition-transform duration-300"
                  key={item.id}
                  onClick={() => {
                    productclick(item);
                  }}
                >
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>
                    {item.description.length > 20
                      ? item.description.substring(4, 50) + "..."
                      : item.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
