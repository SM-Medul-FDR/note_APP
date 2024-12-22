import React from 'react'
import AddCarts from '../components/AddCarts/AddCarts'
import SingleNote from '../components/SingleNote/SingleNote'
import './AllNotes.css'
import PinNotes from '../components/PinNotes/PinNotes'

const AllNotes = () => {
  return (
   <>
    <div className="p-5 w-full ">

      <AddCarts/>
{/* ------------------ Pin Notes */}
      <div className="Main_All_Notes  ">
        
          <h2 className=' Main_All_Notes_Hedding '>Pin Notes</h2>
          <hr className='mb-4  ' />
      <PinNotes/>
      </div>
{/* ------------------ All Notes */}
      <div className="Main_All_Notes  ">
        
          <h2 className=' Main_All_Notes_Hedding '>All Notes</h2>
          <hr className='mb-4  ' />

      </div>

      <SingleNote/>
   

    </div>
   
   </>
  )
}

export default AllNotes