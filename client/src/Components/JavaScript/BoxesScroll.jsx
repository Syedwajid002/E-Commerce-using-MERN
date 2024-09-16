import React, { useEffect, useState } from 'react';
import '../Styles/BoxesScroll.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import BASE from '../../constants/api';

const BoxesScroll = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = () => {
    axios.get(`${BASE}/getProducts`)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Error aaya kab: fetching data:', error);

      })
  }
  useEffect(() => {
    fetchData();
  }, []);

  const productclick = (item) => {
    navigate(`/productdetails/${item.id}`)
  }
  return (
    <>

    <div className="md:grid md:grid-cols-4 w-full p-2.5 justify-center text-center" ref={ref}>
       {data.map(item => (
           <div data-aos="zoom-in">
         <div className="md:flex-col justify-center align-middle content-center mb-5 bg-white mr-2.5 w-72 h-72 text-center border-2 border-l-2 border-black rounded-lg" key={item.id} onClick={() => productclick(item)}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
      </div>
      ))}
    </div>
    </>
  );
})
export default BoxesScroll;
