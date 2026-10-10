import mongoose from "mongoose"
import config from "./config.js"


async function connectDb() {
    await mongoose.connect(config.MONGO_URL)
    console.log("connect to Db")
}

export default connectDb