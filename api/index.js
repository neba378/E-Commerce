const express = require("express")
const dotenv = require("dotenv")
const app = express()
const products = require("./data/Products")
const mongoose  = require("mongoose")
const databaseSeeder = require('./databaseSeeder')

dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>console.log("db connected")).then((err)=>{err})




// db seeder router

app.use('/api/seed', databaseSeeder)
app.listen(PORT || 9000, ()=>{
    console.log(`Server Running on port ${PORT}`)
})