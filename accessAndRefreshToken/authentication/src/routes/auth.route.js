import {Router} from 'express'
import {registerController,meController, refreshController} from '../controllers/auth.controller.js'

const router = Router()

router.post('/register',registerController)

router.get('/me',meController)

router.post('/refresh',refreshController)


export default router