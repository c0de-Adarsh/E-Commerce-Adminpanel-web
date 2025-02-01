const User = require('../Models/userModels')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { generateToken } = require('../jwt')
const sendEmail = require('../Utils/sendEmail')
const crypto = require("crypto")
const cloudinary = require('cloudinary').v2;




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const registerUser = async (req, res, next) => {
    try {

        // Check if file exists in request
        if (!req.files || !req.files.avatar) {
            return res.status(400).json({
                success: false,
                message: "Please provide an avatar image"
            });
        }

        const file = req.files.avatar;

        // Upload to cloudinary using the temporary file path
        const avatarUploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });

        const { name, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: avatarUploadResult.public_id,
                url: avatarUploadResult.secure_url
            }
        });

        // Generate token
        const token = await generateToken(newUser._id, newUser.email);

        res.status(201).json({
            success: true,
            user: newUser,
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = async (req , res) =>{
    try {
        
      const {email , password} = req.body;
      
      if(!email || !password){
        return res.status(401).json({
            message:'Please Enter Both Email And Password'
        })
      }

      const user = await User.findOne({email});

      if(!user){
        return res.status(404).json({
            message:'User Not Found',
            success:false
        })
      }

      const isMatched = await bcrypt.compare(password,user.password)

      if(!isMatched){
        return res.status(401).json({
            message:'Incorrect Password',
            success:false
        })
      } else {
        const userId = user._id
        const email = user.email

        const token = generateToken(userId,email)
        res.status(200).json({
            success:true,
            message:'Login Successfully',
            token
          })
      }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const forgotPassword = async (req , res) =>{
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        //get restpassword

        const resetToken = user.getResetPasswordToken()

        await user.save({validateBeforeSave:false})

        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requrested this email then, please ignore it`;

        try {
            
            await sendEmail({
                email:user.email,
                subject: 'ShopMart Password Recovery',
                message
            })
            res.status(200).json({
                success: true,
                message: `Email send to ${user.email} successfully`
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })

            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

  const resetPassword = async ( req , res) =>{

    try {
       
        //token hash creating

        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{ $gt: Date.now()}
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset Password Token is invalid or hash been expired"
            });
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match"
            });
        }

        user.password = req.body.password;
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined

        await user.save()

        const token = generateToken(user._id,user.email)

        res.status(200).json({
            success: true,
            message: "Passowrd changed successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
  }
module.exports = { registerUser , loginUser , forgotPassword, resetPassword};