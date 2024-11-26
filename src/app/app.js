import axios from "axios";
import { createContext, useState } from "react";




// je cree une const dans laquelle je sauvegarde mon API
export const productsApi = axios.create({
    baseURL: "http://localhost:9000"
});

/**
 * method to get list of products
 * @returns 
 */
export const getProducts = (keyword= "", page=1, size=4) => {
    // c'est json server qui m'oblige a faire name_like
    return productsApi.get(`/products?name=${keyword}&_page=${page}&_per_page=${size}`)
}

/**
 * method to delete a product
 * @returns 
* ``: ceci se nomme le template string
 */
export const deleteProduct = (product) => {
    return productsApi.delete(`/products/${product.id}`)
}

/**
 * method to get un product par son id
 * @returns 
 */
export const getProduct = (id) => {
    return productsApi.get(`/products/${id}`)
}

/**
 * enregistrer un product
 * @returns 
 */
export const saveProduct = (product) => {
    return productsApi.post(`/products`, product)
}

/**
 * method to check un product
 * @returns 
 */
export const checkProduct = (product) => {
    return productsApi.patch(`/products/${product.id}`, {checked: !product.checked})
}

/**
 * update product
 */
export const updateProduct = (product) => {
    return productsApi.put(`/products/${product.id}`, product)
}




export const AppContext = createContext();

// creation d emon hook personnalise
export const useAppState = () => {
    const initialState = {
        products: [],
        currentPage: 1,
        size: 4,
        keyword: '',
        totalPages: 0
    };

    const appState = useState(initialState);
    return appState;
}
