import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import style from "./FeaturedProducts.module.css"
import { Link } from 'react-router-dom'
import { Cartcontext } from '../Context/Cartcontext'
export default function FeaturedProducts() {
    let {addtocart , x} = useContext(Cartcontext)
    async function addproduct(productid){
        let response = await addtocart(productid)
        
    }
    function getfeaturedproducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    let { isLoading, data, refetch } = useQuery('featuredproducts', getfeaturedproducts, {
    })
    // const [products, setproducts] = useState([])
    // const [loading, setloading] = useState(true)
    // async function getproducts() {
    //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //     setproducts(data.data)
    //     setloading(false)
    // }
    // useEffect(() => {
    //     getproducts()
    // }, [])
    return <>

        {isLoading ?
            <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
            :
            <div className="row gy-4">
                <h2 className='fs-1'> Featured products</h2>
                {data?.data.data.map((product) => (
                    <div key={product._id} className={`${style.hover} col-md-2 cursor-pointer overflow-hidden`}>
                        <div>
                            <Link to={`/productdetails/${product.id}`}>
                                <img src={product.imageCover} className='w-100' alt="" />
                                <h6 className='text-main fw-bold'>{product.category.name}</h6>
                                <h5 className='fw-bold'>{product.title.split(' ').slice(0, 2).join(" ")}</h5>
                                <div className='d-flex justify-content-between'>
                                    <span>{product.price}EGP</span>
                                    <span>
                                        <i className='fa fa-star rating-color'></i>
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                            </Link>
                                <button onClick={()=>addproduct(product._id)} className={`${style.addcartbtn} btn bg-main text-center w-100 text-white my-2`}>add to cart</button>
                        </div>
                    </div>
                ))}
            </div>

        }
    </>


}
