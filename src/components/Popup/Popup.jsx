import React, { useEffect, useState } from 'react'
import './Popup.css'
import { getDatabase, push, ref, set, update } from "firebase/database";
import { GiCancel } from "react-icons/gi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { MdFormatColorText } from "react-icons/md";
import { MdOutlineTitle } from "react-icons/md";
import { clearAllListeners } from '@reduxjs/toolkit';
import { use } from 'react';



const Popup = ({showValue , popCross , editDataValue }) => {
// -------------------- Redax Data -----------------------------
    const sliceUser = useSelector((state)=>state.currentUser.value)

    const  [showColore , setShowColore]     = useState(false)
// ---------------------------------------------------------------------
    const [todoData , setTodoData]          = useState({todoTitle: '', todoNote: '', todoError: '', }) 
//-----------------------------------------------------------------------
    const  [colors , setColors ]            = useState('#91ac8fce')
//-----------------------------------------------------------------------
    const [ fontColor , setFontColor ]      = useState('#fff')
    const [noteColor , setNoteColor]        = useState('#fff')
//----------------------------firebase------------------------------------------
    const db                                = getDatabase();
// console.log(fontColor)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= all functions part start

// ------------- 
console.log('this is from popup',editDataValue)


// ------------- Setting data to dataBase
    const handelTodo = () => {
        if(todoData.todoTitle == ''){
            setTodoData((prev)=>({...prev , todoError:'Enter your title'}))  
        }
        else if(todoData.todoNote == ''){
            setTodoData((prev)=>({...prev , todoError:'Enter your Note'}))
        }else{
            set(push(ref(db, 'AllNote/' )), {
                todoTitle:todoData.todoTitle,
                todoNote:todoData.todoNote,
                bgColor: colors,
                fontColor:fontColor,
                noteColor:noteColor,
                pin: false,
                creatorID:sliceUser.uid

              });
              popCross();
              setTodoData((prev)=>({...prev , todoTitle: '', todoNote: '', todoError: '',}))
        }
    }
//-------Update Data----------------
const handelUpdate = () => {

    update(ref(db , "AllNote/" + editDataValue.key),{
        bgColor: colors,
        fontColor:fontColor,
        noteColor:noteColor,
        pin: editDataValue.pin,
        todoTitle:todoData.todoTitle,
        todoNote:todoData.todoNote,
        creatorID:sliceUser.uid
    })
    popCross();
}


useEffect(()=>{
    if(editDataValue){
        setTodoData((prev)=>({
            ...prev,
            todoTitle:editDataValue.todoTitle,
            todoNote:editDataValue.todoNote,
        }))
        setColors(editDataValue.bgColor)
        setFontColor(editDataValue.fontColor)
        setNoteColor(editDataValue.noteColor)
    }
},[editDataValue])



  return (
    <>
    
        <div className={`popup z-50  ${showValue? 'w-full' : 'w-0' } `}>
                <button onClick={popCross} className={`PopupCrossButton ${showValue? 'block':'hidden'} `}  >
                    <GiCancel />
                </button>
            {/* -=-=-= input fields */}
            <div style={{background:colors , }} className={`PopupInputField transition-all duration-[.2s] ${showValue? 'block':'hidden'} `}>
                <p  className=' text-[16px] md:text-[19px] dark:text-[#e98c8cc9] text-[#c56a46d0] font-bold font-roboto flex justify-center ' >{todoData.todoError}</p>
                <h2 style={{color:fontColor}} className='PopupInputFieldTitle transition-all duration-[.2s] '>Title</h2>
                <input style={{color:fontColor}} value={todoData.todoTitle} onChange={(e)=>{setTodoData((para2)=>({ ...para2, todoTitle: e.target.value })),setTodoData((pera)=>({ ...pera, todoError:''}));}} 
                placeholder='Title.....' className='PopupInputFieldInput transition-all duration-[.2s]' type="text" /> 
                <h2 style={{color:noteColor}} className='PopupInputFieldTitle mt-2 transition-all duration-[.2s]'>Note</h2>
                <textarea style={{color:noteColor}} value={ todoData.todoNote} onChange={(e)=>{setTodoData((para2)=>({ ...para2, todoNote: e.target.value })),setTodoData((pera)=>({ ...pera, todoError:''}));}}
                 placeholder='Note.....' className=' PopupInputFieldNote transition-all duration-[.2s] shadow-[0px_6px_28px_16px_rgba(0,_0,_0,_0.2)]' type="text" />
                {/* -=-=-= All colors */}
               
               <div className="flex justify-between items-center">

                <div className=" relative pr-[180px] mt-2 md:mt-3 overflow-hidden ">
                    <div className=" flex gap-4   ">
                        <IoColorPaletteOutline onClick={()=>setShowColore(!showColore)} className={`popupColorIcon overflow-hidden ${showColore? 'rotate-180' : 'left-[-195px]' } `} />
                       
                        <div className={`PopupColors absolute bottom-0 flex gap-1 ${showColore? 'left-10' : 'left-[-195px]' } `}>
                        <button onClick={()=>setColors('#FF8A8A')} className="PopupColorButtons1"></button> 
                        <button onClick={()=>setColors('#F29F58')} className="PopupColorButtons2"></button>
                        <button onClick={()=>setColors('#756AB6')} className="PopupColorButtons3"></button>
                        <div className="PopupCustomColor">
                            <label htmlFor="PopupCustomC">
                            <FaPenFancy className=' PopupCustomColorIcon  ' />
                            </label>
                        <input onChange={(e)=>{setColors(e.target.value)}} className='hidden' id='PopupCustomC' type="color" />
                        </div>
                        </div>
                    </div>
                </div>
                    <div className="SingleNoteSaveButton ">
                        {
                            editDataValue?
                            <button onClick={handelUpdate}
                            className="  h-[40px] md:h-[45px] w-[122px] md:mt-5 mt-3
                            NoteSaveButton relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#00000031] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ca9248] rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffffffa8]" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ca9248] rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffffffa8]" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-200 -translate-x-full bg-[#00000083] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full text-left text-white transition-colors duration-100 ease-in-out group-hover:text-white">Update</span>
                            </button>
                    :    
                            <button onClick={handelTodo}
                            className="  h-[40px] md:h-[45px] w-[122px] md:mt-5 mt-3
                            NoteSaveButton relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#00000031] rounded-md group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ca9248] rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffffffa8]" />
                                </span>
                                <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ca9248] rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffffffa8]" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-200 -translate-x-full bg-[#00000083] rounded-md group-hover:translate-x-0" />
                                <span className="relative w-full text-left text-white transition-colors duration-100 ease-in-out group-hover:text-white">Save Note</span>
                            </button>
                    }
                    </div>
               </div>
{/*------------------------------------------- custom font color */}
<div className=" relative pr-[180px] mt-2 md:mt-0 overflow-hidden ">
    <div className=" flex gap-0   ">
        <MdOutlineTitle onClick={()=>setShowColore(!showColore)} className={`popupColorIcon overflow-hidden ${showColore? '' : 'left-[-195px]' } `} />
                       
        <div className={`PopupColors absolute bottom-0 flex gap-1 ${showColore? 'left-10' : 'left-[-195px]' } `}>  
            <button onClick={()=>setFontColor('#fff')} className="PopupColorButtons4"></button>
            <button onClick={()=>setFontColor('#1e847bf3')} className="PopupColorButtons5"></button>
            <button onClick={()=>setFontColor('#347')} className="PopupColorButtons6"></button>
            <div className="PopupCustomColor">
                    <label htmlFor="PopupCustomCt">
                    <FaPenFancy className=' PopupCustomColorIcon  ' />
                    </label>
                <input onChange={(e)=>setFontColor(e.target.value)} className='hidden' id='PopupCustomCt' type="color" />
            </div>
              
        </div>
    </div>
</div>
                
{/* --------------------------------------------------------------------- */}
                
<div className=" relative pr-[180px] mt-2 md:mt-3 overflow-hidden ">
    <div className=" flex gap-4   ">
        <MdFormatColorText onClick={()=>setShowColore(!showColore)} className={`popupColorIcon overflow-hidden  ${showColore? '' : 'left-[-195px]' } `} />
        <div className={`PopupColors absolute bottom-0 flex gap-1 ${showColore? 'left-10' : 'left-[-195px]' } `}>
            <button onClick={()=>setNoteColor('#fff')} className="PopupColorButtons4"></button>
            <button onClick={()=>setNoteColor('#1e847bf3')} className="PopupColorButtons5"></button>
            <button onClick={()=>setNoteColor('#347')} className="PopupColorButtons6"></button>
            <div className="PopupCustomColor">
                    <label htmlFor="PopupCustomCn">
                    <FaPenFancy className=' PopupCustomColorIcon  ' />
                    </label>
                <input onChange={(e)=>setNoteColor(e.target.value)} className='hidden' id='PopupCustomCn' type="color" />
            </div>
        </div>
    </div>
</div>
                
                
                 
            </div>
        </div>
    
    </>
  )
}

export default Popup