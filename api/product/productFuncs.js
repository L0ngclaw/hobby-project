import axios from "axios";
import {toast} from "react-toastify";

export const addProductHandler = async (product) => {
    await axios.post('/api/product/addProduct', {product: product}).then(res => {

        res.status === 200 ? toast.success('Product added successfully') : toast.error('Product add Error');

    }).catch(err => {
        console.log(err);
    })
}

export const fetchProducts = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/product/fetchProducts').then(res => {
            resolve(res.data.products);
        }).catch(err => {
            reject(err);
        })
    })
}

export const deleteProduct = async (productId) => {
    return new Promise((resolve, reject) => {
        axios.delete('/api/product/deleteProduct', {params: {productId: productId}}).then(res => {
            resolve(res.data.message);
        }).catch(err => {
            reject(err);
        })
    })

}
