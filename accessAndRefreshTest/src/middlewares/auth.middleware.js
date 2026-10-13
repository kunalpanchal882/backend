import jwt from "jsonwebtoken"
import config from "../config/config.js"

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization.split(' ')[1]


    if(!authHeader) {
        return res.status(401).json({message: 'No token provided'})
    }

    try {
        const decoded = jwt.verify(authHeader, config.ACCESS_JWT_SECRET)
        req.userId = decoded.userId
        next()
    }catch (error) {
        return res.status(401).json({message: 'Invalid token',error: error.message})
    }

}