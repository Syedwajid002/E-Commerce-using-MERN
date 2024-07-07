// Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/JavaScript/Navbar';
import Body from '../Components/JavaScript/Body';
import Footer from '../Components/JavaScript/Footer';
// import axios from 'axios';

function Home() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
      const getstatus= localStorage.getItem("isLoggedIn");
      if(getstatus){
        setAuth(true);
        const getname=localStorage.getItem("username");
        setName(getname);
      }
      else{
        setAuth(false);
        setName('')
      }
    }, []);
    // axios.get("http://localhost:5000", { withCredentials: true })
    //   .then(res => {
    //     if (res.data.Status === "Success") {
    //       setAuth(true);
    //       setName(res.data.name);
    //       console.log(res.data.name);
    //     } else {
    //       setAuth(false);
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Error Home me hai " + err);
    //   });

  return (
    <div>
      <Navbar auth={auth} name={name} />
      <Body />
      <Footer />
    </div>
  );
}

export default Home;
