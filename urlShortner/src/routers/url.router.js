import {Router} from 'express'
import {shortUrl,deleteUrll,getAllUrl} from '../controllers/url.controler.js'

const route = Router()

route.post('/url',shortUrl)
route.get('/',getAllUrl)
route.delete('/:id',deleteUrll)


export default route