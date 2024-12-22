import React, { useState } from 'react'

// ==========------ReactIcons
import { VscEye } from "react-icons/vsc";
import { RiEyeCloseFill } from "react-icons/ri";

// ==============-------FireBase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

// =========----Tost
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Flip, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Resister = () => {

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  use state part
    
    const  [show , setShow] = useState(false)
    const [formDaat , setFormData] = useState({email: '' , password: '' , user: ''})
    const [error , setError] = useState({emailError: '' , passwordError: '' , userError: ''})
    const navigate = useNavigate()
    
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  firebase dom part

    const auth = getAuth();


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= function part

    const handelSubmit = (e) =>{
        e.preventDefault()
        if(formDaat.user == '' ){
            setError((pera)=>({...pera , userError: 'Enter your name⚠'}))
        }
        if(formDaat.password == '' ){
            setError((pera)=>({...pera , passwordError: 'Enter your password⚠' }))
        }
        if(formDaat.email == '' ){
                setError((pera)=>({...pera , emailError: 'Enter your e-mail⚠'}))
        }else{
            createUserWithEmailAndPassword(auth, formDaat.email, formDaat.password)
                .then((userCredential) => {
                    const user = userCredential.user;
// =----------------wsers photo & name update
                updateProfile(auth.currentUser, {
                displayName: formDaat.user, 
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5LFtCqVlxw8xQ6psvzksbcgvXwEWK_eZkO6-TNawL5WUbOlmzcECyu9rN7ZjExvoGhI&usqp=CAU",
                }).then(() => {
                    
                    // -=-=-------------- sent email verification
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
// ---------------------------- Navigate to the login page ----------------
                    navigate('/login')
//=----------------------------------success tost ------------------------- 
                    toast.info('Verify your e-mail', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        });
                    });


                }).catch((error) => {
                  
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode == 'auth/email-already-in-use'){
                    toast.error('This email already in use', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        });
                }
                if(errorCode == 'auth/weak-password'){
                    toast.warn('This is a weak password ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        });
                }

            });
       }
            
    }
         
       



  return (
    <>
     
     





    <div className="flex justify-center items-center h-screen relative"
         style={{backgroundImage: "url('images/mountain.png')",backgroundRepeat: "no-repeat",backgroundSize: "cover",}} // <<---------- Ey code ta diye ami ---- BACKGROUND_E_IMAGE ---- set korte parbo
    >

{/*---------------------------- Background with Blur */}

        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>

{/*---------------------------- Login Form with Glassmorphism Effect  */}
        <div id="login" className="w-96 h-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col justify-between p-8 z-10 border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <form className="text-indigo-500">
                <div className="p-6">

{/* --------------------------- Welcome Message */}
                    
                    <p className="text-xl font-semibold text-indigo-700 text-center mb-6 transition-all duration-300 transform hover:text-indigo-900">Welcome!</p>

{/*----------------------------- Name Input  */}

                    <div className="my-4">
                        <label className="text-xs font-bold text-gray-200" htmlFor="name">Name</label>
                        <p className="text-xs text-red-500">{error.userError}</p>
                        <input placeholder='Enter your name.....' onChange={(e) => { setFormData((para) => ({ ...para, user: e.target.value })); setError((pera) => ({ ...pera, userError: "" })); }} className="w-full p-3 mt-2 outline-none rounded-lg bg-white/40 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:bg-white/50" type="text"/>
                    </div>

{/*---------------------------- Mail Input  */}

                    <div className="my-4">
                        <label className="text-xs font-bold text-gray-200" htmlFor="email">Mail</label>
                        <p className="text-xs text-red-500">{error.emailError}</p>
                        <input placeholder='Enter your G-mail.....' onChange={(e) => { setFormData((para2) => ({ ...para2, email: e.target.value })); setError((pera) => ({ ...pera, emailError: "" })); }} className="w-full p-3 mt-2 outline-none rounded-lg bg-white/40 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:bg-white/50" type="email"/>
                    </div>

{/*---------------------------- Password Input */}

                    <div className="my-4 relative">
                        <label className="text-xs font-bold text-gray-200" htmlFor="password"> Password </label>
                        <p className="text-xs text-red-500">{error.passwordError}</p>
                        <input placeholder='Enter yout password.....' onChange={(e) => { setFormData((para3) => ({ ...para3, password: e.target.value })); setError((pera) => ({ ...pera, passwordError: "" })); }} className="w-full p-3 mt-2 outline-none rounded-lg bg-white/40 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:bg-white/50" type={show ? "text" : "password"} />
                        {show ? (
                            <VscEye onClick={() => {setShow(false);}} className="absolute top-[70%] right-4 transform -translate-y-1/2 text-[#3a3938]" />
                        ) : (
                            <RiEyeCloseFill  onClick={() => setShow(true)} className="absolute top-[70%] right-4 transform -translate-y-1/2 text-[#3a3938]" />
                        )}
                    </div>

{/*---------------------------- Link to Login  */}

                    <Link to="/login" className="text-sm text-indigo-300 hover:text-indigo-500 text-center mb-6">Already have an account? <span className="font-bold text-indigo-500">Login</span></Link>

{/*----------------------------- Register Button   */}
                    <button onClick={handelSubmit} className="w-full rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white p-3 text-center font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 mt-6 transition-all duration-300 transform hover:scale-105" type="submit" > Register </button>
                </div>
            </form>
        </div>
    </div>










    </>
  )
}

export default Resister