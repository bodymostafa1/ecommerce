import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Audio } from  'react-loader-spinner'

export default function Register() {
  const [isloading,setisloading]= useState(false)
  let navigate = useNavigate()
  const [error,seterror] = useState(null)
  async function registerSubmit(values) {
    setisloading(true)
   let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
    setisloading(false)
    seterror(err.response.data.message)
  })
   if (data.message == "success"){
    setisloading(false)
    navigate('/login')
   }
  }
  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  let validateschema = Yup.object({
    name: Yup.string().min(3, "name minimum length is 3").max(10,"name maximum length is 10").required("name is required"),
    email:Yup.string().email("email is invalid").required("email is required"),
    phone:Yup.string().matches(phoneRegExp,"phone is invalid").required("phone is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"password is invalid").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")]).required("please enter the same password")
  })
  let fromik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema:validateschema, onSubmit: registerSubmit
  })
  return (
    <>
      <div className='w-75 mx-auto p-4'>
         {error !== null ? <div className='alert alert-danger'>{error}</div>:''}
        <h2>Register now</h2>
        <form action="" onSubmit={fromik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input onChange={fromik.handleChange} value={fromik.values.name} onBlur={fromik.handleBlur} type="text" id='name' className='form-control name' name='name' />
          {fromik.errors.name && fromik.touched.name? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.name}</div> :''}
          <label htmlFor="email">Email</label>
          <input onChange={fromik.handleChange} value={fromik.values.email} onBlur={fromik.handleBlur} type="email" id='email' className='form-control email' name='email' />
          {fromik.errors.email && fromik.touched.email? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.email}</div> :''}
          <label htmlFor="password">Password</label>
          <input onChange={fromik.handleChange} value={fromik.values.password} onBlur={fromik.handleBlur} type="password" id='password' className='form-control password' name='password' />
          {fromik.errors.password && fromik.touched.password? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.password}</div> :''}
          <label htmlFor="rePassword">rePassword</label>
          <input onChange={fromik.handleChange} value={fromik.values.rePassword} onBlur={fromik.handleBlur} type="password" id='rePassword' className='form-control rePassword' name='rePassword' />
          {fromik.errors.rePassword && fromik.touched.rePassword? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.rePassword}</div> :''}
          <label htmlFor="phone">Phone</label>
          <input onChange={fromik.handleChange} value={fromik.values.phone} onBlur={fromik.handleBlur} type="tel" id='phone' className='form-control phone' name='phone' />
          {fromik.errors.phone && fromik.touched.phone? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.phone}</div> :''}
          {isloading==true? <button  className='btn bg-main text-white mt-2' type='button'><Audio
    height = "20"
    width = "70"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /></button>:
           <button disabled={!(fromik.isValid && fromik.dirty)} className='btn bg-main text-white mt-2' type='submit'>Register</button>}
        </form>
      </div>
    </>
  )
}
