const { validationResult } = require('express-validator');
const userservice = require('../service/user.service');
const usermodel = require('../models/user.model');


//validon results  registe mai manlo koi error atta hai rotes mai check ke time to yeh handle krega

module.exports.registeruser = async (req , res , next)=>{
    console.log("Incoming request body:", req.body); 


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation Errors:", errors.array()); 
        return res.status(400).json({errors : errors.array()})

    }
    
   

    const { fullname , email , password} = req.body;

    const hashpassword = await usermodel.hashpassword(password);

    //userservice ko call krskte ab

    const user = await userservice.createuser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password : hashpassword

    });

    const token = user.generateAuthToken();

    res.status(201).json({token , user})



     


}