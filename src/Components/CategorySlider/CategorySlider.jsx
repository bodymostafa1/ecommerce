import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1}
    function getcategory(){
       return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let {isLoading , isError , data} = useQuery('categoryslider' , getcategory)
    console.log(data?.data.data);
  return (<>
  <div className='py-3'>
  {data?.data.data? <Slider {...settings}>
     {data?.data.data.map((category)=><img key={category._id} height={200} className='w-100' src={category.image}/>)}
    </Slider>
  :''}
  </div>
 
  </>
  )
}
