import userModel from "../models/auth.model.js"
import bcrypt from 'bcryptjs'
import { genrateToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js"
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

    res.cookie('refreshToken',refreshToken,{
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
    const accessToken = req.headers.authorization?.split(" ")[1]
 
    if(!accessToken){
        return res.status(401).json({
            messgae:"unauthorized user or token"
        })
    }

    try {
        const decode = verifyAccessToken(accessToken)

        const user = await userModel.findById(decode.id)

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

export const refreshController = async (req,res) => {
    const refreshToken = req.cookies.refreshToken
    
    if(!refreshToken){
        return res.status(401).json({
            message:"Unauthorized user or invalid token"
        })
    }

    try {
        const decode = verifyRefreshToken(refreshToken)

        const user = await userModel.findById(decode.id)

        if(refreshToken !==  user.refreshToken){
            user.refreshToken = null;
            await user.save()

            return res.status(401).json({
                message:"Unauthorized user or invalid token"
            })
        }

      const {accessToken,refreshToken:newRefreshToken} = genrateToken({userId:user._id})

      res.cookie('refreshToken',newRefreshToken,{httpOnly:true})

      user.refreshToken = newRefreshToken
      await user.save()

      res.status(200).json({
        messgae:"token refresh successfully",
        accessToken
      })

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, Invalid or expired refresh token",
        })
    }

}