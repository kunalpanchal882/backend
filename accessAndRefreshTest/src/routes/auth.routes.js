import {Router} from 'express'
import { loginController, logoutController, meController, refreshTokenController, registerController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/refresh-token', refreshTokenController)
router.post('/logout', logoutController)


router.get('/me', authMiddleware, meController)

export default router