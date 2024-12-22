import React from 'react'
import PinNotes from '../components/PinNotes/PinNotes'

const PinedNote = () => {
  return (
    <>
    <div className="p-2">
    <h1 className='text-[20px] mb-10  ' >this is Pined Note page</h1>
      <PinNotes/>
    </div>
  </>
  )
}

export default PinedNote