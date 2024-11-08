import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Bars } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../Context/Cartcontext'
import style from "./Products.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { wishlistcontext } from '../Context/Wishlistcontext'
const notify = () => toast("Product added successfully");
const notify2 = ()=> toast("added to wishlist successfully")
export default function Products() {
  let {addtowishlist} = useContext(wishlistcontext)
  let { addtocart } = useContext(Cartcontext)
  async function addproduct(productid) {
    let response = await addtocart(productid)

  }
  function getproducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let { isLoading, data } = useQuery('products', getproducts, {
  })
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
        <h2 className='fs-1'> Products</h2>
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
              <div className='d-flex justify-content-between'>
                <div onClick={notify}>
                  <button onClick={() => { addproduct(product._id) }} className={`${style.addcartbtn} btn bg-main text-center text-white my-2`}>add to cart</button>
                </div>
                <div onClick={notify2}>
                  <i className='fas fa-heart my-3' onClick={() => { addtowishlist(product._id); }}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    }
    <Toaster />
  </>
}
