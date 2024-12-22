import React, { useEffect, useState } from 'react'
import './PinNotes.css'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database'
import { CiMenuKebab } from 'react-icons/ci'
import Popup from '../Popup/Popup'


const PinNotes = () => {




 //------------- Redax Data
 const sliceUser = useSelector((state)=>state.currentUser.value)


 //------------- Custom Variables
 const[allNotes , setAllNoteas] = useState([])
     const [showPopup , setShowPopup] = useState(false)
     const [editData , setEditData] = useState('')

// ---- card options variable
 const  [showOptions , setshowOptions]     = useState(false)
 const [uniqueCard , setUniqueCard] = useState()
// console.log(allNotes)

 //------------- Firebase Variables
 const db = getDatabase();

 //------------- Functions Part
 const handelUnPin =(UnpinNoteData)=>{
      // console.log(UnpinNoteData)
      update(ref(db , "AllNote/" + UnpinNoteData.key),{
        pin:false
      })
      setshowOptions(false)
    }
//--------------------remove

    const handelRemove =(removeItem)=>{
          set(push(ref(db, 'binNotes/')), {
            todoTitle:removeItem.todoTitle,
            todoNote:removeItem.todoNote,
            bgColor: removeItem.bgColor,
            fontColor:removeItem.fontColor,
            noteColor:removeItem.noteColor,
            pin: removeItem.pin,
            creatorID:sliceUser.uid
          });
  remove(ref(db, "AllNote/" +removeItem.key ))
    }
 //------------- Realtime DataBase DATA

 useEffect(()=>{

     onValue(ref(db, 'AllNote/'), (snapshot) => {
       let arr =[]
       snapshot.forEach((item) => {
         if(item.val().creatorID == sliceUser.uid && item.val().pin ){
           arr.push({...item.val() , key:item.key})
         }
         
       })
       setAllNoteas(arr)
     });

 },[])

 // console.log(uniqueCard)







  return (
    <>

         <div className="flex flex-wrap md:gap-5 gap-4  ">
        
                  {
                      allNotes.map((item)=>(
                        <div key={item.key} style={{background:item.bgColor }} className={`MainSingleNote relative z-0 `}>
                           
                            <div className="cardIcon">
                            
                         
                              <CiMenuKebab  onClick={()=>{setshowOptions(!showOptions) , setUniqueCard(item) }} className={`cardIcon overflow-hidden  ${showOptions? '' : '' } `} />
                           
                            
                              {
                                showOptions&&  uniqueCard.key == item.key&&
                                
                                <div className={` cardOptions absolute bottom-0 flex gap-1 ${showOptions? 'top-0 right-4 block ' : 'hidden' } `}>
                                      <div className="flex flex-col justify-center ">
                                        <button onClick={()=>handelUnPin(item)} className=' cardOption ' >Un Pin</button><hr />          
                                        <button onClick={()=>{setShowPopup(true), setEditData(item) }}  className=' cardOption ' >Edit</button><hr />           
                                        <button  onClick={()=>handelRemove(item)} className=' cardOption ' >Remove</button>            
                                      </div>
                                </div>
                              }

                            </div>
                            
                          <h2 style={{color:item.fontColor}} className=' MainSingleNoteH2 ' >{item.todoTitle}</h2>
                          <p style={{color:item.noteColor}} className=' MainSingleNoteP ' >{item.todoNote} </p>
                        </div>
                      ))
                  }
        
            </div>
    
            <Popup showValue={showPopup} popCross={()=>setShowPopup(false) } editDataValue={editData} />
    </>
  )
}

export default PinNotes