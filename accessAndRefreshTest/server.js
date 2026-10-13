import app from './src/app/app.js'
import connectDB from './src/config/db.js'
import config from './src/config/config.js'


await connectDB()

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})