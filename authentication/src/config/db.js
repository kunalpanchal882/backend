import mongoose from 'mongoose'
import config from './config.js'

async function connecctDb () {
    await mongoose.connect(config.MONGO_URI)
    console.log("connect to db")
}


export default connecctDb