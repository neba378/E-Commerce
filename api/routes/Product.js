const express = require("express");

const productRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const protect = require("../middleware/Auth");


productRoute.get("/", AsyncHandler(
    async (req,res) =>{
        const products = await Product.find({})
        res.json(products)
    }
))


module.exports = productRoute;