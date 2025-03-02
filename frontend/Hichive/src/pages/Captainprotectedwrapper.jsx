import React, { useContext, useState } from "react";
import { CaptainDataContext } from "../context/Captaincontext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';


const Captainprotectedwrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {captain, setCaptain} =useContext(CaptainDataContext);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token])
  axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
    headers:{
        Authorization: `Bearer ${token}`
    }

    }).then((response)=>{
        if(response.status === 200){
            setCaptain(response.data.captain);
            setisloading(false);}
        }).catch( error =>{
            console.log(error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
      

  if(isloading){
    return (
        <div>Loading...</div>
    )
  }


  

  return <>{children}</>;
};

export default Captainprotectedwrapper;
