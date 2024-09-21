import { faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "computer", price: 4300, checked: false },
    { id: 2, name: "printer", price: 3200, checked: true },
    { id: 3, name: "phone", price: 1200, checked: false },
  ]);


  const handleDeleteproduct = (product) => {
    const NewProducts = products.filter((p) => p.id !== product.id);
    setProducts(NewProducts);
  }



  return (
    <div className='p-1 m-1'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h3>Products compoonent</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>name</th>
                    <th>price</th>
                    <th>checked</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>
                          <button className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={p.checked?faCheckCircle:faCircle}>

                            </FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteproduct(p)} className='btn btn-outline-danger'>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
      </div>
        </div>
      </div>
      
    </div>
  )
}

export default Products