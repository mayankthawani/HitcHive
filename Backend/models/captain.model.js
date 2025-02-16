
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const captainschema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email:{
        type: String,
        required: true,
        unique:true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],

    },
    password:{
        type: String,
        requires:true,
        select:false,//password ko select nahi karna hai
    },
    soketid:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],//active or inactive agr busy hai to inactive
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color must be atleast 3 characters long"],

        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"Plate must be atleast 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be atleast 1"],
        },
        vehicleType:{
            type:String,
            enum:["car","bike","auto"],
            required:true,
        },
    

    },
    location:{
        lati:{
            type:Number,
        },
        longi:{
            type:Number,
        }
    }


})


captainschema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET , {expiresIn:"24h"});
    return token;
} //When a user logs in, we need a way to keep them authenticated in future requests without asking for their username and password again. Auth tokens (JWTs) help achieve this by securely identifying the user.



captainschema.methods.comparepassword = async function(password){
     return await bcrypt.compare(password , this.password);
}

captainschema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password , 10);//10 is the number of rounds When a user registers, their password is hashed and stored in the database. The number of rounds is the number of times the password is hashed. The more rounds, the more secure the password is. The default number of rounds is 10.
}//Salt rounds determine how many times the hashing algorithm will process the password before producing the final hashed value Higher salt rounds = More secure, but slower.Lower salt rounds = Faster, but less secure


const captainmodel = mongoose.model('captain' , captainschema);
module.exports = captainmodel;