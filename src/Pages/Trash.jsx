import React from 'react'
import TrashNote from '../components/Trash/TrashNote'

const Trash = () => {
  return (
    <>
    <div className="flex flex-col p-2 w-full">
    {/* <h1 className='text-[20px] mb-10 ' >this is Trash page</h1> */}
      <TrashNote/>
    </div>
  </>
  )
}

export default Trash