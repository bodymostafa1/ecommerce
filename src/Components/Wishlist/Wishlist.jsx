import React, { useContext, useState } from 'react'
import { wishlistcontext } from '../Context/Wishlistcontext'
import { Cartcontext } from '../Context/Cartcontext'
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast("Product added successfully");
export default function Wishlist() {
  const [wishlistdata, setwishlistdata] = useState(null)
  let { getwishlist ,removeproduct} = useContext(wishlistcontext)
  let {addtocart } = useContext(Cartcontext)
  async function removefromwishlist(productid){
    removeproduct(productid)
    setwishlistdata(await getwishlist())
  }
  async function getuserwishlist() {
    setwishlistdata(await getwishlist())
  }
  getuserwishlist()
  return <>
    <div className="row bg-body-secondary">
      {wishlistdata?.data.data.map((product) => (
        <div key={product.id} className='align-items-center d-flex justify-content-between p-3'>
          <div>
            <div className='d-flex align-items-center'>
              <img src={product.imageCover} alt="" className='' width="150px" />
              <div className=' p-2'>
                <h3 className='bolder'>{product.slug}</h3>
                <span className='text-main fw-bolder'>price: {product.price} EGP</span>
                <span onClick={()=>{removefromwishlist(product.id)}} className='d-block text-danger fw-bolder mt-2 cursor-pointer'> <i className='fas fa-trash-can '></i> Remove</span>
              </div>
            </div>
          </div>
          <div className=' p-3' onClick={notify}> <button className='btn bg-main text-white' onClick={()=>{addtocart(product.id);}}> Add to cart</button></div>
        </div>
      ))}
    </div>
    <Toaster/>
  </>
}
