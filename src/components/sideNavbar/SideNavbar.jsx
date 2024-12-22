import React, { useEffect, useState } from 'react'
import  './sideNav.css'
import { NavLink } from 'react-router-dom'
// ------ icons
import { MdOutlineNoteAlt } from "react-icons/md";
import { TfiPinAlt } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";

const SideNavbar = () => {

// --==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=    Light & Dark mode Function Start

// ========== state
const [toggleValue, setToggleValue] = useState(false);
// ========== saving the mode when user  visitor
useEffect(() => {
  const savedMode = localStorage.getItem("mode") || "light";
  localStorage.setItem("mode", savedMode);
  document
  .querySelector("html")
  .classList.toggle("dark", savedMode === "dark");
}, []);
// ========== changing the mode on toggle
const handelMode = () => {
  if (localStorage.getItem("mode") == "light") {
    localStorage.setItem("mode", "dark");
    document.querySelector("html").classList.add("dark");
    setToggleValue(!toggleValue);
  } else {
    localStorage.setItem("mode", "light");
    document.querySelector("html").classList.remove("dark");
    setToggleValue(!toggleValue);
  }
};

// --==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=    Light & Dark mode Function End


  return (
    <>
    
       <div className="Medul_main_side_nav ">
            <div className="main_side_nav">
{/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  Nav Items Start */}
                <div className="Main_Nav">
                    <ul>
                        <li>
                          {/* --------------- 1 */}
                            <NavLink
                              to="/" className={({ isActive}) =>[isActive ? " single_nav_Active " : " single_nav_unactive",].join(" ")}>
                                <MdOutlineNoteAlt className='Nav_icons' /> All Notes
                            </NavLink>
                            {/* -------------- 2 */}
                            <NavLink
                              to="/pinedNote" className={({ isActive}) =>[isActive ? " single_nav_Active " : " single_nav_unactive",].join(" ")}>
                                <TfiPinAlt className='Nav_icons' /> Pined Notes
                            </NavLink>
                            {/* --------------- 3 */}
                            <NavLink
                              to="/trash" className={({ isActive}) =>[isActive ? " single_nav_Active " : " single_nav_unactive",].join(" ")}>
                                <BsFillTrashFill className='Nav_icons' /> Trash
                            </NavLink>
                        </li>
                    </ul>
                </div>
{/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  Nav Items end */}
{/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=   Light & Dark mode Button Start */}
              <div className="flex flex-col items-center justify-center mt-5 ">

                {
                  localStorage.getItem("mode") == "light" ? 
                  (<button className="Button_Durk " onClick={handelMode}> Dark </button>) 
                  : 
                  (<button className="Button_Light " onClick={handelMode} >Light</button>)
                }
                  <p className='Change_Theme' >Change The Theme</p>

                </div>
{/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=   Light & Dark mode Button End */}

            </div>

       </div>

    </>
  )
}

export default SideNavbar