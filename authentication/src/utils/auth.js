import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const genrateToken = ({userId}) => {
    const accessToken = jwt.sign({id:userId},config.ACCESS_JWT_SECRET,{expiresIn:'15m'})
    const refreshToken = jwt.sign({id:userId},config.REFRESH_JWT_SECRET,{expiresIn:'7d'})

    return {
        accessToken,
        refreshToken
    }
}

