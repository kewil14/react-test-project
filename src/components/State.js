import React, { useContext } from 'react'
import { AppContext } from '../app/app'

export default function State() {
    const [state, setState] = useContext(AppContext);
    return (
        <div>
            

            <button type="button" className="btn btn-primary">
                Caddy
                <span className="badge badge-light">
                    {state.products.length}
                </span>
            </button>
        </div>
    )
}
