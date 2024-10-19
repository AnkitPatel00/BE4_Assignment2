const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
const mongoURI = process.env.mongo_URI
const initializeDatabase =async () => {
  try {
    const connected =await mongoose.connect(mongoURI)
    if (connected)
    {
      console.log("Connected successfully")
    }
  }
  catch (error)
  {
console.log('Connection Failed',error)
  }
}

module.exports = initializeDatabase