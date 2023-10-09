import axios from 'axios'
import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function Productdetails() {
    let { id } = useParams()
    function getproductdetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        
    }
    let {isLoading , isError,data} = useQuery('productdetails', () => getproductdetails(id))
    useEffect(() => {
        getproductdetails(id)
    })
    return <>
        {data?.data.data? <div className='row gy-2 align-items-center'>
            <div className='col-md-4'>
                <img src={data.data.data.imageCover} alt="" className='w-100' />
            </div>
            <div className='col-md-8'>
                <h5>{data.data.data.title}</h5>
                <p>{data.data.data.description}</p>
                <h6 className='text-main'>{data.data.data.category.name}</h6>
                <h6 className='text-main'>Price: {data.data.data.price}EGP</h6>
                <div className='d-flex justify-content-between'>
                    <span>Number of ratings: {data.data.data.ratingsQuantity}</span>
                    <div>
                        
                        <span><i className='fas fa-star rating-color mx-1'></i>{data.data.data.ratingsAverage}</span>
                    </div>
                </div>
                <button className='btn bg-main text-white w-100 mt-2F'>add to cart</button>
            </div>
        </div>  :<div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>}
    </>
    
}
