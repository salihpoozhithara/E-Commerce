import jwt from 'jsonwebtoken'


const adminAuth = async (req,res,next) =>{
    try {
        
        // to get token from uisers req header
        const { token } =req.headers
        // check token is available or not 
        if (!token) {
            return res.json({success:false, message:"Not Authorized Login Again"})
        }
        // if the token availabe then decode that token
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        // check decoded token is equal to admin email + admin password 
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:"Not Authorized Login Again"})

        }
        next



    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

export default adminAuth