import React, { useState } from 'react'
import './AddCarts.css'
// =--- icon
import { MdOutlineNoteAdd } from "react-icons/md";
import Popup from '../Popup/Popup';



const AddCarts = () => {
    const [show , setShow] = useState(false);


  return (
    <>
    
            <div onClick={() => setShow(true)} className="AddmainCart">
                <MdOutlineNoteAdd  className='AddCartIcon' />
                <p className=' AddCartIconText' >Add note</p>
            </div>
         <Popup  showValue={show} popCross={()=>setShow(false)} />
    
    </>
  )
}

export default AddCarts