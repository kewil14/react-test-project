import React, { useContext } from 'react'
import { AppContext } from '../app/app'

export default function SearchForm() {
    const [state, setState] = useContext(AppContext);
    return (
        <div>
            <form onSubmit={handleSearchProduct}>
                <div className='row g-2'>
                  <div className='col-auto'>
                      <input className='form-control'
                        value={queryState}
                        onChange={(e) => setQueryState(e.target.value)}
                      />
                  </div>
                  <div className='col-auto'>
                    <button className='btn btn-success'>
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
            </form>
        </div>
    )
}