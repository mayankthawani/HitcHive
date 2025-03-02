import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Usercontext from './context/Usercontext.jsx'
import CaptainContext from './context/Captaincontext'

createRoot(document.getElementById('root')).render(
    
    <CaptainContext>
    <Usercontext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Usercontext>
    </CaptainContext>
   
  
)
