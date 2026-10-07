import userModel from "../models/auth.model.js"
import bcrypt from 'bcryptjs'
import { genrateToken } from "../utils/auth.js"


export const registerController = async(req,res) => {
    const {name,email,password} = req.body

    const isUserExist = await userModel.findOne({email})

    if(isUserExist){
        return res.status(409).json({
            message:"User already exist",
            error:[
                {
                    path:"email",
                    message:"email alreaddy exist"
                }
            ]
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordHash:await bcrypt.hash(password,10)
    })

    const {accessToken,refreshToken}  = genrateToken({userId:user._id})

    user.refreshToken = refreshToken
    user.save()

    res.cookie('refreshToekn',refreshToken,{
        httpOnly:true
    })

    res.status(201).json({
        message:"user register successfully",
        data:{
            user:{
                name:user.name,
                email:user.email
            }
        },
        accessToken
    })



}