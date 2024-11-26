import { faCheckCircle, faCircle, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, checkProduct, deleteProduct, getProducts } from '../app/app';
import { useNavigate } from 'react-router-dom';

function Products() {
  // setProducts: elt qui permet de modifier les products
  // NB: products: est un accesseur, et setProducts: un mutateur permettant de gerer(changer l'etat)
  // const [products, setProducts] = useState([]);

  // state for a query
  const [queryState, setQueryState] = useState("")

  // hook pour le routage
  const navigate = useNavigate();

  const [productState, setProductState] = useContext(AppContext);

  // // state modifie
  // const [productState, setProductState] = useState({
  //   products: [],
  //   currentPage: 1,
  //   size: 4,
  //   keyword: '',
  //   totalPages: 0
  // });

  useEffect(() => {
    handleGetProducts(productState.keyword, productState.currentPage, productState.size);
  }, []);


  const handleGetProducts = (keyword, page, size) => {
    
    // axios.get("http://localhost:9000/products")
    //   .then(resp => {
    //     const products = resp.data;
    //     setProducts(products);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    // depuis mon repository
    getProducts(keyword, page, size)
      .then(resp => {
       
        const totalElements = resp.data.items || 0;
        
        console.log('resp', resp.data);



        
        console.log('Total elements', totalElements);
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size !== 0) ++totalPages;


        // setProducts(resp.data);
        setProductState({
          ...productState, products: resp.data.data, keyword: keyword, currentPage: page, size: size, totalPages: totalPages
        })
      })
      .catch((e) => {
        console.log(e);
      })
    
  }


  // fonction pour la suppression d'un produit
  const handleDeleteproduct = (product) => {
    deleteProduct(product)
      .then(resp => {
        // recharger la liste des produits grace a une requete get
        // handleGetProducts();

        // filtrer la liste du composant
        const newProducts = productState.products.filter((p) => p.id !== product.id)
        // setProducts(newProducts);
         setProductState({
           ...productState, products: newProducts
         })
    })

    // const NewProducts = products.filter((p) => p.id !== product.id);
    // setProducts(NewProducts);
  }


  // function pour changer le status cheched des products
  const handleCheckProduct = (product) => {
    

    checkProduct(product).then((res) => {
      const NewProducts = productState.products.map((p) => {
      if (p.id === product.id) {
        p.checked = !p.checked;
      }
        return p;
      });
      // setProducts(NewProducts);
      setProductState({
           ...productState, products: NewProducts
         })
    })
  }

  const handleGoToPage = (page) => {
    console.log('productState', productState);
    handleGetProducts(productState.keyword, page, productState.size);
  }

  const handleSearchProduct = (event) => {
    event.preventDefault();
    console.group('there', event.target.value);
    handleGetProducts(queryState, 1, productState.size);
  }

  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>


            {/* card de recherche */}
          <div className='card mb-2'>
            <div className='card-body'>
              <SearchForm></SearchForm>
            </div>
          </div>


          <div className='card'>
            <div className='card-body'>
              <h3>Products compoonent</h3>
              
              {/* table  de liste des products*/}
              <table className='table'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productState.products.map((p) => (
                      // le key permet d'avoi des elts uniques dans le dom
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>
                          <button onClick={() => handleCheckProduct(p)} className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={p.checked?faCheckCircle:faCircle}>

                            </FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteproduct(p)} className='btn btn-outline-danger'>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button className='btn btn-outline-warning' onClick={() => navigate(`/updateProduct/${p.id}`)}>
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>


              {/* ul de la navigation */}
              <ul className='nav nav-pills'>
                {new Array(productState.totalPages).fill(0).map((v, index) => (
                    <li key={index}>
                    <button onClick={() => handleGoToPage(index + 1)} className=
                      {
                      index + 1 === productState.currentPage
                        ? 'btn btn-info ms-1'
                        : 'btn btn-outline-info ms-1'
                      }
                      >
                        {index+1}
                      </button>
                    </li>
                  ))
                }
              </ul>



            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Products