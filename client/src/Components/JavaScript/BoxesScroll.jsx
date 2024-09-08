import React, { useEffect, useState } from 'react';
import '../Styles/BoxesScroll.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BoxesScroll = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = () => {
    axios.get('http://localhost:5000/getProducts')
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

    <div className="wrapper" ref={ref}>
       {data.map(item => (
           <div data-aos="zoom-in-down">
         <div className="Item" key={item.id} onClick={() => productclick(item)}>
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