import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import SignUpLogin from './Pages/SignUpLogin'
const App = () => {
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
    </Routes>
    </BrowserRouter>
   </div>
   </>
  )
}

export default App