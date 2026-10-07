import app from "./app/app.js";
import connecctDb from "./config/db.js";


connecctDb()

app.listen('3000',() =>{
    console.log("server is running on port 3000")
})