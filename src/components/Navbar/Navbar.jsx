import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../slice/UserSlice';

const Navbar = () => {
// ----------- Redax Data import
    const sliceUser = useSelector((state)=> state.currentUser.value)
    // console.log(sliceUser)
    // console.log(JSON.parse(localStorage.getItem('currentUser')))

    //---------------- variable part
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handelOut = ()=>{
        navigate('/login')
        localStorage.removeItem('currentUser')
        dispatch(userData(null))

    }




  return (
    <>
        <nav className=" shadow-indigo-500/50 py-1 px-1 md:px-6 dark:bg-[#202124] bg-[#fff] border-b-[1px] border-gray-300 flex justify-between transition-all duration-[.2s] ">
            <div className="logo flex items-center font-Monstarait font-bold dark:text-white transition-all duration-[.2s]"><img src="images/logo2.png" alt="logo" className=' h-[35px] ' />ThinkNote</div>
            <div className="flex justify-end mr-[10px] md:mr-0 ">
                <div className="profileData flex items-center gap-2 ">
                    <div className="userPhoto border-2 overflow-hidden dark:border-white border-black w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-gray-400 transition-all duration-[.2s] ">
                        <img src={sliceUser?.photoURL} alt="demo" />
                    </div>
                    <h2 className=' text-[13px] md:text-lg font-semibold font-nunito dark:text-white transition-all duration-[.2s]' >{sliceUser?.displayName}</h2>
                    <IoLogOutOutline onClick={handelOut} className=' text-2xl text-gray-500 hover:text-[rgba(255,160,37,0.86)] transition-all duration-[.2s] '/>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar