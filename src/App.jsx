
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Resister from './components/Resister/Resister'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/Login'
import LayoutOne from './Layout/LayoutOne'
import PinedNote from './Pages/PinedNote'
import Trash from './Pages/Trash'
import AllNotes from './Pages/AllNotes'


function App() {

    const myRoute = createBrowserRouter(
      createRoutesFromElements(
        <Route>
          <Route path='/register' element={<Resister/>}/>
          <Route path='/login' element={<Login/>}/>
              {/* --------- layout one */}
            <Route path='/' element={<LayoutOne/>}>
              <Route index element={<AllNotes/>}/>
              <Route path='/pinedNote' element={<PinedNote/>}/>
              <Route path='/trash' element={<Trash/>}/>
              
            </Route>


        </Route>
      )
    )




  return (
    <>
      <RouterProvider router={myRoute} />
      <ToastContainer/>

    </>
  )
}

export default App
