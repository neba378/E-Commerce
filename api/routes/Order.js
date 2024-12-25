const express = require("express");

const orderRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const protect = require("../middleware/Auth");
const Order = require("../models/Order");

orderRoute.post(
  "/",
  protect,
  AsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      price,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order item found")
    }
    else{
        const order = new Order({
          orderItems,
          shippingAddress,
          paymentMethod,
          price,
          taxPrice,
          shippingPrice,
          totalPrice,
          user:req.user._id
        });
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
  })
);

module.exports = orderRoute;
