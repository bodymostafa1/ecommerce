import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { usercontext } from '../Context/Usercontext';

export default function Login() {
  let { setusertoken } = useContext(usercontext)
  const [isloading, setisloading] = useState(false)
  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  async function loginsubmit(values) {
    setisloading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setisloading(false)
      seterror(err.response.data.message)
    })
    if (data.message == "success") {
      setisloading(false)
      localStorage.setItem('usertoken', data.token)
      setusertoken(data.token)
      navigate('/')
    }
  }
  let validateschema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid").required("password is required"),
  })
  let fromik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: validateschema, onSubmit: loginsubmit
  })
  return (
    <>
      <div className='w-75 mx-auto p-4'>
        {error !== null ? <div className='alert alert-danger'>{error}</div> : ''}
        <h2>Login now</h2>
        <form action="" onSubmit={fromik.handleSubmit}>
          {fromik.errors.name && fromik.touched.name ? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.name}</div> : ''}
          <label htmlFor="email">Email</label>
          <input onChange={fromik.handleChange} value={fromik.values.email} onBlur={fromik.handleBlur} type="email" id='email' className='form-control email' name='email' />
          {fromik.errors.email && fromik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.email}</div> : ''}
          <label htmlFor="password">Password</label>
          <input onChange={fromik.handleChange} value={fromik.values.password} onBlur={fromik.handleBlur} type="password" id='password' className='form-control password' name='password' />
          {fromik.errors.password && fromik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.password}</div> : ''}
          {fromik.errors.phone && fromik.touched.phone ? <div className='alert mt-2 p-2 alert-danger'>{fromik.errors.phone}</div> : ''}
          {isloading == true ? <button className='btn bg-main text-white mt-2' type='button'><BallTriangle
            height={20}
            width={100}
            radius={5}
            color="white"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          /></button> : <div className='d-flex align-items-center'>
            <button disabled={!(fromik.isValid && fromik.dirty)} className='btn bg-main text-white mt-2 me-2' type='submit'>Login</button>
            <Link to={'/register'} className='btn'>Register now </Link>
          </div>
          }
        </form>
      </div>
    </>
  )
}
