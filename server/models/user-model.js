const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//^ Hashing the password using bcrypt

userSchema.pre('save', async function (next) {//*this Pre method will run before we save our "created User" in database (serach this on google to understand it and this is not the correct definition) 
    
    // console.log("pre method",this);

    const user = this;

    if (!user.isModified("password")) {   //* if user's password is not modified or not created (if creating for first time )
        next();                         //~ middleware
    }

    try {

        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {

        next(error);
    }
});


//^ Json web Token

//! Using "UserSchema.methods" you can create many methods/fucntions (syntax: UserSchema.methods.fucntion_name).
//~ The fucntions created using this are k/as "Instance Methods" i.e generateToken() is an "Instance Method"
userSchema.methods.generateToken = async function () {  //* you can access this anyware in your "controllers" i.e auth-controller
    try {
        return jwt.sign(
            {               //*Payload
                userID:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,       //* Signature
            {
                expiresIn:"30d",
            }
        )        
    } catch (error) {
        console.error(error);
    }
};

//^ Comparing Password i.e Password validation

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    // console.log(this)
    return await bcrypt.compare(password,this.password);
    
  } catch (error) {
    console.error(error)
  }
};



//^ define model or collection name

const User = new mongoose.model('User', userSchema);

module.exports = User;
