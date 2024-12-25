const express = require("express")
const dotenv = require("dotenv")
const app = express()
const products = require("./data/Products")
const mongoose  = require("mongoose")
const databaseSeeder = require('./databaseSeeder')
const userRoute = require("./routes/User")
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order")

dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>console.log("db connected")).then((err)=>{err})



app.use(express.json())
// db seeder router

app.use('/api/seed', databaseSeeder)

app.use('/api/users/', userRoute)

app.use("/api/products/", productRoute);

app.use("/api/orders/", orderRoute)
app.listen(PORT || 9000, ()=>{
    console.log(`Server Running on port ${PORT}`)
})