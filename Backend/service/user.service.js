const usermodel = require('../models/user.model')
//user ko create krega yeh function
module.exports.createuser = async({firstname  ,lastname , email , password})=>{
    if(!firstname  || !email || !password){
        throw new Error('All feilds are required');
    }
    const user = usermodel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
     
}