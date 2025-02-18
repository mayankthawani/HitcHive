import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import UserSignup from './pages/UserSignup'
import Userlogin from './pages/Userlogin'

const App = () => {
  return (
    <div>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/captain-login" element={<Captainlogin />} />
           <Route path="/captain-signup" element={<CaptainSignup />} />
           <Route path="/user-signup" element={<UserSignup />} />
           <Route path="/user-login" element={<Userlogin />} />

        </Routes>
   
    </div>
  )
}

export default App
