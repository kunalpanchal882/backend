import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:[3,"Name must be min 3 charector long"],
        maxLength:[8,"Name must be max 8 charector long"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    passwordHash:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    }
})

const userModel = new mongoose.model('auth',userSchema)

export default userModel