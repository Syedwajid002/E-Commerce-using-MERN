import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../Components/Styles/BoxesScroll.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Searchresults = () => {
  const { query } = useParams();
  // console.log(query)
  const [results, setResults] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(query)
        const response = await axios.post('http://localhost:5000/SearchResults', { query });
        // console.log("ya tak sahi hai")
        setResults(response.data.result);
        console.log("Received data");
      } catch (error) {
        console.error("Error aagaya:", error);
      }
    };
  
    fetchResults();
  }, [query]);
  
  const productclick=(item)=>{
    navigate(`/productdetails/${item.id}`);
  }

  return (
    <>
    <div className="pt-8">
    <div className="flex items-center">
      <ol className="flex w-full items-center overflow-hidden">
        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
          <Link to='/'>Home</Link>
        </li>
        <li className="text-body mt-0.5 text-base">/</li>
        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
        <Link to='/AllProducts'>Products</Link>
        </li>
      </ol>
    </div>
  </div>
      <h2><u>Searched Products</u></h2>
      <div className="wrapper">
        {results.length>0 ? results.map(item => (
          <div className="Item" key={item.id} onClick={()=>{productclick(item)}}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description.length>20 ? item.description.substring(4,50) + "...":item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
          </div>
        )): <h2>No products Found </h2>}
      </div>
    </>
  );
};

export default Searchresults;
