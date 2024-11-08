import axios from "axios";
import { createContext, useState } from "react";
export let x
export let Cartcontext = createContext()
export default function Cartcontextprovider(props) {
    let headers = {
        token: localStorage.getItem('usertoken')
    }
    async function addtocart(productid) {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: productid
        }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);
        console.log(data)
    }
    function deletecartitem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);
    }
    function onlinepayemnt(cartid, values, url) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`, {
            shippingAddress: values
        }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);
    }
    function updatecartquan(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error);
    } 
    function getloggeduseritems() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: headers }).then((response) => response).catch((error) => error)
    }
    return <Cartcontext.Provider value={{ addtocart, onlinepayemnt, x, getloggeduseritems, deletecartitem, updatecartquan }}>
        {props.children}
    </Cartcontext.Provider>
}
// https://ecommerce.routemisr.com//api/v1/orders/checkout-session/6519a65e8c8afd0034ffbc5d?url=http://localhost:3000
// https://ecommerce.routemisr.com/api/v1/orders/checkout-session/6519a65e8c8afd0034ffbc5d?url=http://localhost:3000