// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import NewProduct from './components/NewProduct';
import UpdateProduct from './components/UpdateProduct';
import { AppContext, useAppState } from './app/app';
import State from './components/State';

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  // ceci est un hook qui permet de gerer les sifde effect
  useEffect(() => {
    // console.log("will");
    const path = window.location.pathname.toLowerCase();
    setCurrentRoute(path.slice(1, path.length)); 
    console.log(path);
  }, []);
  return (

    <AppContext.Provider value={useAppState()}>
      <BrowserRouter>
        {/* {currentRoute } */}
        <nav className='m-3 p-1 border-success navbar navbar-expand-lg navbar-light` bg-light'>
          <ul className="nav na-pills">
            <li>
              <Link 
              onClick={() => setCurrentRoute("home")}
              className={
                currentRoute === 'home'
                  ? 'btn btn-success ms-1'
                  : 'btn btn-outline-success ms-1'
              } to={'/home'}>Home</Link>
            </li>
            <li>
              <Link
              onClick={() => setCurrentRoute("products")}
                className={
                currentRoute === 'products'
                  ? 'btn btn-success ms-1'
                  : 'btn btn-outline-success ms-1'
              } to={'/products'}>Products</Link>
            </li>
            <li>
              <Link
              onClick={() => setCurrentRoute("newProduct")}
                className={
                currentRoute === 'newProduct'
                  ? 'btn btn-success ms-1'
                  : 'btn btn-outline-success ms-1'
              } to={'/NewProduct'}>NewProduct</Link>
            </li>
            {/* <li>
              <Link to={'/Home'}>Home</Link>
            </li> */}
          </ul>

          <ul className='nav navbar-nav'>
            <li>
              <State></State>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route> 
          <Route path='/newProduct' element={<NewProduct />}></Route> 
          <Route path='/updateProduct/:id' element={<UpdateProduct />}></Route> 
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>

  )
    
  ;
}

export default App;
