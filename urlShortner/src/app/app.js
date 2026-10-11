import express from 'express'
import uerlRoute from '../routers/url.router.js';
import urlModel from '../models/url.model.js';
import { shortUrl } from '../controllers/url.controler.js';

const app = express()

app.use(express.json())


app.use('/api',uerlRoute)

app.get('/:code',async(req,res) => {
    const {code} = req.params

    const url =await  urlModel.findOne({
        shortUrl:code
    })

    if(!url){
        return res.status(404).json({
            message:"url not found"
        })
    }

    res.redirect(302,url.orignalUrl)

    await urlModel.findOneAndUpdate({
        shortUrl:code
    },{
        $inc:{clickCount:1}
    })

    
})


export default app