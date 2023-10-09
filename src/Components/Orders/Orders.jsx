import React, { useContext } from 'react'
import { Cartcontext } from '../Context/Cartcontext';

export default function Orders() {
  let {getloggeduseritems} = useContext(Cartcontext)
  
  return (
    <div>Orders</div>
  )
}
