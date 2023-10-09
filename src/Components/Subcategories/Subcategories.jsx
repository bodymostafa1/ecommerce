import axios from 'axios'
import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
export default function Subcategories() {
  let { id } = useParams()
  function getcategname(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  let category = useQuery('category', () => getcategname(id))
  function getsubcategory(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }
  let {isLoading , isError,data} = useQuery('productdetails', () => getsubcategory(id))
  useEffect(() => {
    getsubcategory(id)
    getcategname(id)
  })
console.log(data)
  return<>
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
       <h2 className='text-center bolder text-main'>{category?.data.data.data.name} </h2> 
        {data?.data.data.map((subcategory) => (
          <div className='col-md-4  rounded ' key={subcategory._id}>
            <div className='border rounded cursor-pointer shadow'  id={subcategory._id}>
              <h2 className='bolder text-center'> {subcategory.name}</h2>
            </div>
          </div>
        ))}
      </div>}
  </>

}
