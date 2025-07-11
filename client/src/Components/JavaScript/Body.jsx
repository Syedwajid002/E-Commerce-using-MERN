import React, { useRef } from "react";
import "../Styles/Body.css";
import BoxesScroll from "./BoxesScroll";
import { Link, useNavigate } from "react-router-dom";
function Body() {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const scrollToComponent = () => {
    // Use setTimeout to ensure BoxesScroll renders and ref is set
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/Products/men`);
      }
    }, 100); // small delay to allow ref to bind
  };
  return (
    <div className="fullbody">
      <div className="body">
        <div className="mainHeadings text-center">
          <div data-aos="zoom-in">
            <b>
              <h2 className="text-center  text-4xl p-4 mt-0">
                Buy anything you want
              </h2>
            </b>
          </div>
        </div>
        <div className="sideheading">
          <div data-aos="zoom-out">
            <h1 className="font-bold text-3xl  ">Raining Offers For</h1>
            <h1 className="font-bold text-3xl">Cool Winters</h1>
            <h3 className="font-bold text-3xl ">Great Deals upto 50% OFF</h3>
            <button
              onClick={scrollToComponent}
              className="shop bg-slate-300 hover:bg-gray-200 rounded-md p-2"
            >
              Shop Now
            </button>
          </div>
          {/* <Link to='/login'><button className='bg-blue-600 text-white rounded-md pr-3 pl-3 p-2 font-semibold m-2.5 md:hidden'>Login</button></Link> */}
        </div>
        <div className="md:hidden flex w-full justify-between list-none position-absolute bg-black  border-0 text-white p-2 mt-6">
          <Link to="/Products/men" className="">
            <li>Mens</li>
          </Link>
          <Link to="/Products/women">
            <li>Womens</li>
          </Link>
          <Link to="/Products/jewelery">
            <li>Jewellary</li>
          </Link>
          <Link to="/Products/electronics">
            <li>Electronics</li>
          </Link>
        </div>
      </div>
      <BoxesScroll ref={targetRef} />
    </div>
  );
}

export default Body;
