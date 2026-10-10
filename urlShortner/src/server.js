import app from "./app/app.js";
import connectDb from "./config/db.js";

connectDb()

app.listen(3000,() =>{
    console.log("server is runing on port 3000")
})