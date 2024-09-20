import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [currentRoute, setCurrentRoute] = useState();

  return (
    <BrowserRouter>
      <nav className='m-3 p-1 border-success'>
        <ul className="nav na-pills">
          <li>
            <Link 
            onclick={() => setCurrentRoute("Home")}
            className={
              currentRoute === 'Home'
                ? 'btn btn-success ms-1'
                : 'btn btn-outline-success ms-1'
            } to={'/Home'}>Home</Link>
          </li>
          <li>
            <Link
            onclick={() => setCurrentRoute("Products")}
              className={
              currentRoute === 'Products'
                ? 'btn btn-success ms-1'
                : 'btn btn-outline-success ms-1'
            } to={'/Products'}>Products</Link>
          </li>
          {/* <li>
            <Link to={'/Home'}>Home</Link>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route> 
      </Routes>
    </BrowserRouter>
  )
    
  ;
}

export default App;
