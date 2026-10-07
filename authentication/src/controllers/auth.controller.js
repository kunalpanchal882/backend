import userModel from "../models/auth.model.js"
import bcrypt from 'bcryptjs'
import { genrateToken, verifyAccessToken } from "../utils/auth.js"
import { model } from "mongoose"


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

export const meController = async(req,res) =>{
    const accessToken = req.header.authorization?.split[" "]

    if(!accessToken){
        return res.status(401).json({
            messgae:"unauthorized user or token expire"
        })
    }

    try {
        const decode = verifyAccessToken(accessToken)

        const user = userModel.findById(decode._id)

        res.status(200).json({
            message:"user fetch successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email
                }
            }
        })
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized, Invalid or expired access token"
        })
    }


}