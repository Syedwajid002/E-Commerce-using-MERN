import React, { useEffect, useState } from "react";
import "../Styles/BoxesScroll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../constants/api";

const BoxesScroll = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = () => {
    axios
      .get(`${BASE}/getProducts`)
      .then((response) => {
        setisLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error aaya kab: fetching data:", error);
        setisLoading(true);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const productclick = (item) => {
    navigate(`/productdetails/${item.id}`);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40 space-y-2 animate-pulse ">
          <div className="w-10 h-10 border-4 border-dashed rounded-full border-gray-400 animate-spin"></div>
          <p className="text-sm text-black">Loading products, please wait...</p>
        </div>
      ) : (
        <div
          className="md:grid md:grid-cols-4 w-full p-2.5 justify-center align-middle content-center text-center"
          ref={ref}
        >
          {data.map((item) => (
            <div data-aos="zoom-in">
              <div
                className="md:flex-row justify-center align-middle content-center mb-3 bg-white w-72 h-72 text-center border-l-2 border-gray-400 rounded-lg hover:scale-110 transition-transform duration-300"
                key={item.id}
                onClick={() => productclick(item)}
              >
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
});
export default BoxesScroll;
