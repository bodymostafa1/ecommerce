import './App.css';
import Layout from "../src/Components/Layout/Layout"
import Home from "../src/Components/Home/Home"
import Cart from "../src/Components/Cart/Cart"
import Categories from "../src/Components/Categories/Categories"
import Brands from "../src/Components/Brands/Brands"
import Login from "../src/Components/Login/Login"
import Products from "../src/Components/Products/Products"
import Register from "../src/Components/Register/Register"
import NotFound from "../src/Components/NotFound/NotFound"
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Usercontextprovider, { usercontext } from './Components/Context/Usercontext';
import ProtectedRoute from '../src/Components/Protectedroute/ProtectedRoute';
import Productdetails from '../src/Components/Productdetails/Productdetails'
import Cartcontextprovider, { Cartcontext } from './Components/Context/Cartcontext';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import Subcategories from './Components/Subcategories/Subcategories';
import Wishlist from './Components/Wishlist/Wishlist';
import Wishlistcontextprovider from './Components/Context/Wishlistcontext';
function App() {

  let routers=createHashRouter([
    {path:"/" , element:<Layout/>,children:[
      {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'address',element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'productdetails/:id',element:<ProtectedRoute><Productdetails/></ProtectedRoute>},
      {path:'categories/subcategories/:id',element:<ProtectedRoute><Subcategories/></ProtectedRoute>},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    ]
}
])
  return (<>
  <Cartcontextprovider>
  <Usercontextprovider>
    <Wishlistcontextprovider>
  <RouterProvider router={routers}></RouterProvider>
    </Wishlistcontextprovider>
  </Usercontextprovider>
  </Cartcontextprovider>
  </>
  );
}

export default App;
