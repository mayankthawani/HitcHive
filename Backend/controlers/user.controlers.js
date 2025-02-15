const { validationResult } = require('express-validator');
const userservice = require('../service/user.service');
const usermodel = require('../models/user.model');
const blacklistTokenSchema = require('../models/blacklisttoken.model');


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



module.exports.registeruser = async (req, res, next) => {
    console.log("Incoming request body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashpassword = await usermodel.hashpassword(password);

    const user = await userservice.createuser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};

module.exports.loginuser = async (req, res, next) => {
    console.log("Incoming request body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await usermodel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const ismatch = await user.comparepassword(password);
    if (!ismatch) {
        return res.status(401).json({ message: "Invalid Password" });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ token, user });
    
};



module.exports.getprofile = async(req , res , next )=>{ //middleware lagana paega kyoki check krne ke liye konsa user login hai
    res.status(200).json(req.user);
   
    

}

module.exports.logoutuser = async(req , res , next )=>{
    res.clearCookie('token');
    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    await blacklistTokenSchema.create({token});//blacklist mai token save krdo
    res.status(200).json({message : "User logged out successfully"});

}
