import {Router} from 'express'
import {registerController,meController} from '../controllers/auth.controller.js'

const router = Router()

router.post('/register',registerController)

router.get('/me',meController)


export default router