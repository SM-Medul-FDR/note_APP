import React, { useState } from 'react'

// ==========------ReactIcons
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { RiEyeCloseFill } from "react-icons/ri";

// ==============-------FireBase
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from '../../slice/UserSlice';

// =========----Tost




const Login = () => {
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  use state part

    const [show, setShow] = useState(false);
    const [formDaat, setFormData] = useState({ email: '', password: '',});
    const [error, setError] = useState({ emailError: '', passwordError: '',  });
    const navigate = useNavigate()
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==========  firebase dom part
    const auth = getAuth();
    const dispatch = useDispatch()
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= function part
    const handelSubmit = (e) => {
        e.preventDefault();
        if (formDaat.password == '') {
            setError((pera) => ({ ...pera, passwordError: 'Enter your password⚠' }));
        }
        if (formDaat.email == '') {
            setError((pera) => ({ ...pera, emailError: 'Enter your e-mail⚠' }));
        } else {
        signInWithEmailAndPassword(auth, formDaat.email, formDaat.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user)
                if(user.emailVerified == true) {
                    //---------------- Navigate to the home page
                    navigate('/')
                    toast.success('loggin Success', {
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
 //----------------- store the users data 
                dispatch(userData(user)
            )   
            localStorage.setItem('currentUser' , JSON.stringify(user) )
        }else{
                    toast.info('Email is not verified',{
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
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                // console.log(errorCode)
                if(errorCode){
                    toast.info('Somthing went wrong', {
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
                    
                }

            });
        }

    };





    return (
        <>




        <div className='flex justify-center items-center h-screen relative'>
        {/* ----------------------------------------- Background with Blur  */}
                
                <div className='absolute inset-0 bg-cover bg-no-repeat' style={{ backgroundImage: "url('images/mountain.png')" }}>
                    <div className='absolute inset-0 bg-black opacity-50 blur-sm'></div>
                </div>

        {/* ----------------------------------------- Login Form with Glassmorphism Effect */}
                
                <div id="login" className="w-96 h-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col justify-between p-8 z-10 border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <form className="text-gray-800">
                        <div className="p-6">

        {/* ----------------------------------------- Welcome Message */}

                            <p className="text-xl font-semibold text-indigo-700 text-center mb-6 transition-all duration-300 transform hover:text-indigo-900">Welcome again!</p>

        {/* ---------------------------------------- Mail Input */}
                            <div className="my-4">
                                <label className="text-sm font-bold text-gray-200" htmlFor="email">Mail </label>
                                <p className='text-xs text-red-500'>{error.emailError}</p>
                                <input onChange={(e) => {  setFormData((para2) => ({ ...para2, email: e.target.value })),  setError((pera) => ({ ...pera, emailError: '' }));  }}  className="w-full p-3 mt-2 outline-none rounded-lg bg-white/40 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:bg-white/50" type="email"  placeholder="Enter your email....." />
                            </div>
        {/* ---------------------------------------- Password Input */}
                            
                            <div className="my-4 relative">
                                <label className="text-sm font-bold text-gray-200" htmlFor="password">Password</label>
                                <p className='text-xs text-red-500'>{error.passwordError}</p>
                                <input onChange={(e) => {  setFormData((para3) => ({ ...para3, password: e.target.value })),  setError((pera) => ({ ...pera, passwordError: '' }));  }}  className="w-full p-3 outline-none mt-2 rounded-lg bg-white/40 text-white placeholder-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:bg-white/50" type={show ? 'text' : 'password'} placeholder="Enter your password....." />
                                {show ? 
                                    <VscEye onClick={() => { setShow(false); }} className='absolute top-[70%] right-4 transform -translate-y-1/2 text-[#3a3938]' />
                                    :
                                    <RiEyeCloseFill  onClick={() => setShow(true)} className='absolute top-[70%] right-4 transform -translate-y-1/2 text-[#3a3938]' />
                                }
                            </div>

        {/* ---------------------------------------- Link to Register */}
                            
                            <Link to='/register' className='text-sm text-indigo-300 hover:text-indigo-500 text-center mb-6'> Don't have an account? <span className='font-bold text-indigo-500'>Register</span> </Link>

        {/* ---------------------------------------- Login Button  */}
                            
                            <button  onClick={handelSubmit}  className="w-full rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 text-white p-3 text-center font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 mt-6 transition-all duration-300 transform hover:scale-105" type='submit' > Login </button>

                        </div>
                    </form>
                </div>
        </div>






        </>
    );
}

export default Login