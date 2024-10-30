import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

// for token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// -----------------Route for user login----------------------
const loginUser = async (req,res) => {
    try {
        // to get email; & pass 
        const {email, password} = req.body

        // to check user is available in that email id then store to user
        const user = await userModel.findOne({email})

        // not available 
        if (!user) {
            return res.json({success:false, message:"User doesn't exist"})

        }

        // if the user available then match the password
        const isMatch = await bcrypt.compare(password,user.password)
        if (isMatch) {
            
            const token = createToken(user._id)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
      


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}




//--------------- Route for user registration--------------
const registerUser = async (req,res) => {
    // res.json({msg:'Register API working'})
    try {
        
        const {name, email, password} =req.body
        
        // checking user already exist or not 
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message:'User already exist'})
        }

        // validating email format & strong password

        if (!validator.isEmail(email)) {
            return res.json({success:false, message:'Please enter a valid email'})

        }
        if (password.length < 8 ) {
            return res.json({success:false, message:'Please enter a strong password'})

        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // create user
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        // save this users in our DB
        const user =await newUser.save() 

        // provide one token - user can logiing th app

        const token = createToken(user._id)
        res.json({success:true,token})





    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})

    }
}

//--------------- Route for admin login---------------------
const adminLogin = async (req,res) => {

    try {
        
        // get users emaailid or password
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            //  create one token and will send that token to admin user
            const token = jwt.sign(email+password,process.env.JWT_SECRET)

            // send this token to adminUser
            res.json({success:true, token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }


}



export {loginUser,registerUser,adminLogin}