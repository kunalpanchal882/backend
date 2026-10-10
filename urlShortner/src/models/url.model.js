import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    orignalUrl:{
        type:String,
        require:true
    },
    shortUrl:{
        type:String,
        require:true
    },
    clickCount:{
        type:Number,
        default:0
    }
})

const urlModel = new mongoose.model("URLShortner",urlSchema)

export default urlModel