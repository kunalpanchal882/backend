import config from '../config/config.js'
import jwt from "jsonwebtoken"

export function generateAccessToken({userId}) {
    const payload = { userId }
    return jwt.sign(payload, config.ACCESS_JWT_SECRET, { expiresIn: '15m' })
}

export function generateRefreshToken({userId}) {
    const payload = { userId }
    return jwt.sign(payload, config.REFRESH_JWT_SECRET, { expiresIn: '7d' })
}

export function readRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, config.REFRESH_JWT_SECRET)
        return decoded
    } catch (error) {
        return null
    }   
}

export function readAccessToken(accessToken) {
    return jwt.verify(accessToken, config.ACCESS_JWT_SECRET)
}
