import './App.css';
import Home from './Pages/Home';
import { Routes,Route } from 'react-router-dom';
import Category from './Pages/Category';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Productdetails from './Pages/Productdetails';
import Searchresults from './Pages/Searchresults';
import BoxesScroll from './Components/JavaScript/BoxesScroll';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Products/:Category' element={<Category/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/productdetails/:id' element={<Productdetails/>}/>
        <Route path='/Searched/:query' element={<Searchresults />} />
        <Route path='/AllProducts' element={<BoxesScroll/>}/>
        <Route path='/Mycart' element={<Cart/>}/>̥
        <Route path='/Checkout' element={<Checkout/>}/>

      </Routes>
    </div>
  );
}

export default App;
