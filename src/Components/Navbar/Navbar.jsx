import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/images/freshcart-logo.svg'
import { usercontext } from '../Context/Usercontext'
export default function Navbar() {
  let { usertoken, setusertoken } = useContext(usercontext)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('usertoken');
    setusertoken(null)
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img src={logo} alt="fresh market logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {usertoken !== null ? <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/products">products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/categories">categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/brands">brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">cart</Link>
              </li>
            </> : ''}


          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mt-2">
              <i className='fab fa-facebook mx-2'></i>
              <i className='fab fa-twitter mx-2'></i>
              <i className='fab fa-instagram mx-2'></i>
              <i className='fab fa-tiktok mx-2'></i>
              <i className='fab fa-youtube mx-2'></i>
            </li>

            {usertoken !== null ? <>
              <li className="nav-item">
                <span onClick={()=>logout()} className="nav-link active cursor-pointer" aria-current="page" to="">Logout</span>
              </li>
            </> : <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
              </li></>}


          </ul>
        </div>
      </div>
    </nav>
  )
}
