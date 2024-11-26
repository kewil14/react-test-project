import React, { useEffect, useState } from 'react'
import { getProduct, saveProduct, updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';

function UpdateProduct() {

  // hook pour recuperer les parametre de l'url de la route
  const { id, } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleGetProductById(id)
  }, []);


  const handleGetProductById = (id) => { 
    getProduct(id).then((resp) => {
      let product = resp.data;
      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);
    })
  }


  const handleUpdateProduct = (event) => {
    // empecher de rafraichier toute la page au moment du submit du formulaire
    // event.preventDefault();
    
    let product = { id, name, price, checked };
    updateProduct(product)
      .then((resp) => { 
        alert(JSON.stringify(resp.data));
      })
  }


  return (
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            {/* essayons d'afficher */}
            {/* {name} */}
            <form onSubmit={handleUpdateProduct}>
              <div className='mb-3'>
                <label className='form-label'>Name:</label>
                <input
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  className='form-control'
                  type='text'
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Price:</label>
                <input
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
                  className='form-control' type='number' />
              </div>
              <div className='mb-3 form-check'>
                <input
                  onChange={(event) => setChecked(event.target.value)}
                  checked={checked}
                  className='form-check-input' type='checkbox' />
                <label className='form-check-label'>Checked:</label>
              </div>
              <button className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UpdateProduct