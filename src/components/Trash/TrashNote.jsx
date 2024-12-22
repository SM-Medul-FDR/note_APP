import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { FaTrashAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

const TrashNote = () => {
//----------------- redux data
    const sliceUser = useSelector((sec)=>sec.currentUser.value)


//----------------- variabls
    const [removeData , setRemoveData] = useState([])


//----------------- fireBase  variabls
    const db = getDatabase();



//----------------- functions

const permanentDelete =(deleteData)=>{
    remove(ref(db , 'binNotes/' + deleteData.key))
}
const hendelAllDelete =()=>{
    remove(ref(db , 'binNotes/'))
}
//-------------- recover data
const handelRecover = (recoverData)=>{
     set(push(ref(db, 'AllNote/' )), {
        todoTitle:recoverData.todoTitle,
        todoNote:recoverData.todoNote,
        bgColor:recoverData.bgColor,
        fontColor:recoverData.fontColor,
        noteColor:recoverData.noteColor,
        pin:recoverData.pin ,
        creatorID:recoverData.creatorID
    
    });
    remove(ref(db , 'binNotes/' + recoverData.key))
}


//----------------- realtime  DataBase

useEffect(()=>{
    onValue(ref(db , 'binNotes/'), (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
            if(item.val().creatorID == sliceUser.uid){
                arr.push({...item.val() , key:item.key })
            }
        })
        setRemoveData(arr)
    });
}, [])
console.log(removeData)





  return (
    <>  
            <div className="flex justify-between items-center ">
                <h2 className=' text-[20px] font-roboto font-semibold dark:text-white '>Your deleted notes</h2>
                <div className="text-right">
                        <button onClick={hendelAllDelete}
                        className="px-2 z-30 py-2 bg-rose-400 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-[15px]"
                        >
                        Delete All
                        </button>
                </div>
            </div>
            {
                removeData.map((item)=>(
                    
                    <div key={item.key} className=" singleRemoveItem flex justify-between mt-6 pr-3">

                        <div className="MainSingleNote  md:!w-[390px] ">
                            <h2  className=' MainSingleNoteH2 ' >{item.todoTitle}</h2><hr />
                            <p  className=' MainSingleNoteP ' >{item.todoNote}</p>
                        </div>
                    <div className="flex flex-col gap-3  ">
                    <div className="">
                            <button onClick={()=>permanentDelete(item)} className="flex overflow-hidden ring-[1px] ring-white w-[60px] hover:w-[90px] items-center gap-2 cursor-pointer bg-[#dd8989be] text-white px-2 py-[1px] rounded-full transition-all ease-in-out hover:scale hover:scale-105 font-[revert] active:scale-100 shadow-lg" >
                            Delete
                            <FaTrashAlt />
                            </button>

                        </div>
                        <div className="">
                            <button onClick={()=>handelRecover(item)} className="flex overflow-hidden ring-[1px] ring-white w-[66px] hover:w-[85px] items-center gap-1 cursor-pointer bg-[#8dc28fbe] text-white text-[14px] px-2 py-[2px] rounded-full transition-all ease-in-out hover:scale hover:scale-105 font-[revert] active:scale-100 shadow-lg" >
                            Recover
                            <FaRedoAlt   />
                            </button>

                        </div>
                    </div>
                    </div>

                ))
            }
    
    </>
  )
}

export default TrashNote