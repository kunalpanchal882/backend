import userModel from '../models/auth.model.js'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken, readRefreshToken } from '../utils/auth.utils.js'

export async function registerController(req,res) {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({message: 'Please fill all the fields'})
    }

    const userExists = await userModel.findOne({email})

    if(userExists) {
        return res.status(400).json({message: 'User already exists'})
    }

    const user = await userModel.create({
        name,
        email,
        hashPassword: await bcrypt.hash(password, 10)
    })

    const acessToken = generateAccessToken({userId: user._id})

    const refreshToken = generateRefreshToken({userId: user._id})

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    await userModel.findByIdAndUpdate(user._id, {refreshToken}, {new: true})


    res.status(201).json({
        message: 'User registered successfully',
        data:{
            user: {
                name: user.name,
                email: user.email
            }
        },
        acessToken
    })

}

export async function loginController(req,res) {
    const {email,password} = req.body

    const user = await userModel.findOne({email})   

    if(!user) { 
        return res.status(400).json({message: 'User does not exist'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashPassword)

    if(!isPasswordValid) {
        return res.status(400).json({message: 'Invalid password'})
    }

    const accessToken = generateAccessToken({userId: user._id})

    const refreshToken = generateRefreshToken({userId: user._id})

    await userModel.findByIdAndUpdate(user._id, {refreshToken})

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
        message: 'User logged in successfully',
        data:{
            user: {
                name: user.name,
                email: user.email
            },
            accessToken
        }

    })
}

export async function refreshTokenController(req,res) {
    const {refreshToken} = req.cookies

    if(!refreshToken) {
        return res.status(400).json({message: 'No refresh token provided'})
    }

    try {

        const decoded = readRefreshToken(refreshToken)

        if(!decoded) {
            return res.status(400).json({message: 'Invalid refresh token'})
        }

        const {userId} = decoded

        const user = await userModel.findById(userId)

        if(!user) {
            return res.status(400).json({message: 'Invalid refresh token'})
        }

        const accessToken = generateAccessToken({userId: user._id})

        const newRefreshToken = generateRefreshToken({userId: user._id})

        await userModel.findByIdAndUpdate(user._id, {refreshToken: newRefreshToken})

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).json({
            message: 'Access token refreshed successfully',
            data:{
                accessToken
            }
        })


    } catch (error) {
        return res.status(400).json({message: 'Invalid refresh token'})
    }

}

export async function logoutController(req,res) {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) {
        return res.status(400).json({message: 'No refresh token provided'})
    }

    const user = await userModel.findOne({refreshToken})

    if(!user) {
        return res.status(400).json({message: 'Invalid refresh token'})
    }

    await userModel.findByIdAndUpdate(user._id, {refreshToken: null}, {new: true})

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })  

    res.status(200).json({message: 'User logged out successfully'})
}

export async function meController(req,res) {
    const userId = req.userId

    console.log('userId:', userId)
 
    const user = await userModel.findById(userId)

    if(!user) {
        return res.status(400).json({message: 'User does not exist'})
    }

    res.status(200).json({
        message: 'User fetched successfully',
        data:{
            user: {
                name: user.name,
                email: user.email
            }
        }
    })   

}