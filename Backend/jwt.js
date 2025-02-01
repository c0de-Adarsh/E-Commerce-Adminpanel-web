const jwt = require('jsonwebtoken')
const User = require('./Models/userModels')
require('dotenv').config()


const generateToken = (userData) =>{

    try {
        
       const payload = {
         userId: userData._id,
         email: userData.email,
       } 

       const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'5d'})

       return token
    } catch (error) {
        console.log('Error while creating token',error)
    }
}

const jwtAuthMiddleWare = async( req , res , next) =>{

    try {
        
        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(400).json({
                message:'Token Not Found',
                success:false
            })
        }


        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(402).json({
                message:'Unauthorized',
                success:false
            })
        }

        //token validation 

        jwt.verify(JWT_SECRET,token, async (err , decoded)=>{

            if(err){
                return res.status(400).json({
                    error:'Invalid Token',
                    success:false
                })
            }

            const user = await User.findById(decoded.userId)

            if(!user){
                return res.status(404).json({
                    message:'User Not Found',
                    success:false
                })
            }

            req.user = user

            next()
        })
    } catch (error) {
        console.log('Error during authentication',error)
        res.status({
            error:'Internal Server Error',
            success:false

        })
    }
}

module.exports = {jwtAuthMiddleWare,generateToken}