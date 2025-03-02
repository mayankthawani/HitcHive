import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import UserSignup from './pages/UserSignup'
import Userlogin from './pages/Userlogin'
import Start from './pages/Start'
import Userprotedwrap from './pages/Userprotedwrap'
import Userlogout from './pages/Userlogout'
import Captaainstart from './pages/Captaainstart'
import Captainprotectedwrapper from './pages/Captainprotectedwrapper'
import Captainlogout from './pages/Captainlogout'


const App = () => {
  return (
    <div>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/captain-login" element={<Captainlogin />} />
           <Route path="/captain-signup" element={<CaptainSignup />} />
           <Route path="/user-signup" element={<UserSignup />} />
           <Route path="/user-login" element={<Userlogin />} />
           <Route path='/start' element={
            <Userprotedwrap>
                <Start />
            </Userprotedwrap>
           } />
            <Route path='/cstart' element={
              <Captainprotectedwrapper>
                  <Captaainstart />
              </Captainprotectedwrapper>
              
                
            } />
           <Route path='/user/logout' element={
            <Userprotedwrap>
                <Userlogout/>
            </Userprotedwrap>
           } />
           <Route path='/captain-logout'element = {<Captainprotectedwrapper>
               <Captainlogout/>   
            </Captainprotectedwrapper>
           } />

        </Routes>
   
    </div>
  )
}

export default App
