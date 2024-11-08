import { createContext, useContext, useState } from "react";
import axios from "axios";

export let wishlistcontext= createContext()
export default function Wishlistcontextprovider(props){
    let headers = {
        token: localStorage.getItem('usertoken')
    }
    async function addtowishlist(productid){
       
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
            productId: productid
        }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error); 
    }
    async function getwishlist(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
            headers: headers
        }).then((response) => response)
            .catch((error) => error); 
    }
    async function removeproduct(productid){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}` ,{
            headers: headers
        }).then((response) => response)
            .catch((error) => error); 
    }
    return <wishlistcontext.Provider value={{addtowishlist , getwishlist,removeproduct}}>
        {props.children}
    </wishlistcontext.Provider>
}