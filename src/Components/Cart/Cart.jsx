import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useContext } from 'react'
import { Cartcontext } from '../Context/Cartcontext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartdetails, setcartdetails] = useState(null)
  let { getloggeduseritems, deletecartitem, updatecartquan } = useContext(Cartcontext)
  async function getcart() {
    let { data } = await getloggeduseritems()
    setcartdetails(data)
  }
  async function removeitem(productId) {
    let { data } = await deletecartitem(productId)
    setcartdetails(data)
  }
  async function updatecount(productId, count) {
    let { data } = await updatecartquan(productId, count)
    setcartdetails(data)
  }
  useEffect(() => {
    getcart()
  }, [])
  console.log(cartdetails)
  return <>
    {cartdetails ? <div className="w-75 bg-main-light mx-auto p-3 my-2">
      <h3>shopping cart</h3>
      <h6 className='text-main fw-bolder'>cart items {cartdetails.numOfCartItems}</h6>
      <h6 className='text-main fw-bolder'>total cart price {cartdetails.data.totalCartPrice}EGP</h6>
      {cartdetails.data.products.map((product) => <div key={product.product._id} className='row border-bottom px-2'>
        <div className='col-md-1'>
          <img className='w-100' src={product.product.imageCover} alt="" />
        </div>
        <div className='col-md-11'>
          <div className='d-flex justify-content-between'>
            <div>
              <h6>{product.product.title.split().slice(0.3).join(' ')}</h6>
              <h6 className='text-main'>price: {product.price} EGP</h6>
            </div>
            <div>
              <button onClick={() => updatecount(product.product._id, product.count + 1)} className='btn brdr-main p-1'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => updatecount(product.product._id, product.count - 1)} className='btn brdr-main p-1'>-</button>
            </div>
          </div>
          <button onClick={() => removeitem(product.product._id)} className='btn p-0 mb-2'><i className='fas fa-trash-can text-danger'></i> remove</button>
        </div>
        
      </div>
      )}
      <div className='d-flex justify-content-center'>
        <Link  to={"/address"} className='btn bg-main w-25 m-2 text-white'> Online payment</Link>
        <button className='btn bg-main w-25 m-2 text-white'> Cash on delivey</button>
        </div>
    </div> : <section id='loading' className='d-flex justify-content-center align-items-center'>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></section>}

  </>
}
