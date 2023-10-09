import axios from 'axios'
import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
export default function Categories() {

  function getcategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let { data, isLoading } = useQuery('categories', getcategories)
  return (<>
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
      </div> :
      <div className='row gy-3 gx-4 mt-4 '>
        {data?.data.data.map((category) => (
          <div className='col-md-4  rounded ' key={category._id}>
            <Link to={`subcategories/${category._id}`}>
            <div className='border rounded cursor-pointer shadow'  id={category._id}>
              <img src={category.image} alt="" className='w-100 image-fluid' height={300}/>
              <h2 className='bolder text-main text-center'> {category.name}</h2>
            </div>
            </Link>
          </div>

        ))}
      </div>}
  </>
  )
}
