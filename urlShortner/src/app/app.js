import express from 'express'
import uerlRoute from '../routers/url.router.js'

const app = express()

app.use(express.json())


app.use('/api',uerlRoute)


export default app