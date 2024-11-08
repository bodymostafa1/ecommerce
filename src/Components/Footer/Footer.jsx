import React from 'react'
import { FaMailBulk } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import style from "../Footer/Footer.module.css"
export default function Footer() {
  return <>
    <div className={`${style.footer_bg}  text-capitalize `}>
      <div className='container py-3'>
        <div className="row">
          <div className="col-md-4">
            <h5 className={`${style.bold_text}`}>contact us!</h5>
            <div className='d-flex m'>
              <div><span className={`${style.icon} rounded rounded-3 p-1 me-5`}><FaMailBulk /></span></div>
              <div><span className={`${style.icon} rounded rounded-3 p-1 me-5`}><FaFacebook /></span></div>
              <div><span className={`${style.icon} rounded rounded-3 p-1 me-5`}><FaInstagram /></span></div>
            </div>
            <h6 className={`${style.bold_text} mt-2`}>Store address:e.g., 123 E-Commerce St, City, Country</h6>
          </div>
          <div className="col-md-4">

          </div>
          <div className="col-md-4">

          </div>
        </div>
      </div>
    </div>
  </>
}
