import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
export default function Brands() {
  function getbrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data , isLoading} = useQuery('brands' , getbrands)
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
        {data?.data.data.map((brand) => (
          <div className='col-md-3  rounded ' key={brand._id}>
            <div className='border rounded cursor-pointer shadow'  id={brand._id}>
              <img src={brand.image} alt="" className='w-100 image-fluid' height={300}/>
              <h2 className='bolder text-main text-center'> {brand.name}</h2>
            </div>
          </div>

        ))}
      </div>}
  </>
  )
}
