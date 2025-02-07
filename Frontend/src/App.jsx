import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import SignUpLogin from './Pages/SignUpLogin'
import { useDispatch, useSelector } from 'react-redux'
import { me } from './Actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import { isLogin as IsLogin } from './Actions/userActions'
import Dashboard from './Pages/Dashboard'
const App = () => {

     const dispatch = useDispatch()

     const {isLogin , isUpdated} = useSelector(state=> state.user)

      useEffect(()=>{
        dispatch(me())
      },[dispatch,isLogin,isUpdated])

      useEffect(() => {
        const LogOrNot = () => {
          dispatch(IsLogin());
        }
        LogOrNot()
        
      }, []);
  return (
   <>
   <div>
    <BrowserRouter>
    <NavBar/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/auth' element={<SignUpLogin />}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-14 font-bold  "

      />
    </BrowserRouter>
   </div>
   </>
  )
}

export default App