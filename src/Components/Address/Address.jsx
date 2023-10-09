import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Cartcontext } from '../Context/Cartcontext'

export default function Address() {
  const [cartid, setcartid] = useState('')
  let { onlinepayemnt ,getloggeduseritems} = useContext(Cartcontext)
  async function getcartid(){
    let {data}= await getloggeduseritems()
    setcartid(data?.data._id)
  }
  async function handleaddressinfo(values) {
    await getcartid()
    console.log(cartid)
    let response = await onlinepayemnt(cartid, values, "http://localhost:3000")
    window.location.href = response?.data.session.url
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: handleaddressinfo
  })
  return (<>
    <div className='container'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='details'>Details</label>
        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='details' id='details' type='text' />
        <label htmlFor='city'>City</label>
        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='city' id='city' type='text' />
        <label htmlFor='phone'>Phone</label>
        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='phone' id='phone' type='text' />
        <button className='bg-main text-white btn' type='submit'>Checkout </button>
      </form>
    </div>
  </>
  )
}