import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide1 from '../Assets/images/slider-image-1.jpeg'
import Slide2 from '../Assets/images/slider-image-2.jpeg'
import Slide3 from '../Assets/images/slider-image-3.jpeg'
import blog1 from '../Assets/images/blog-img-1.jpeg'
import blog2 from '../Assets/images/blog-img-2.jpeg'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
   <><div className="row my-3">
    <div className="col-md-10">
    <Slider {...settings}>
      <img className='w-100' height={400} src={Slide1} alt="" />
      <img className='w-100' height={400} src={Slide2} alt="" />
      <img className='w-100' height={400} src={Slide3} alt="" />
    </Slider>
    </div>
    <div className="col-md-2">
    <img className='w-100' height={200} src={blog1} alt="" />
    <img className='w-100' height={200} src={blog2} alt="" />
    </div>
   </div>
   
   
   </>
  )
}
