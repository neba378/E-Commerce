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

orderRoute.put("/:id/payment", protect, AsyncHandler(
  async(req,res) => {
    const order = await Order.findById(req.params.id)

    if (order){
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        status: req.body.status,
        updated_time: req.body.updated_time,
        email_address: req.body.email_address
      };
      const updatedOrder = await order.save()
      res.json(updatedOrder)
      
    }
    else{
      res.status(401)
      throw Error("Order not found")
    }
  }
))


orderRoute.get('/', protect, AsyncHandler(
  async(req,res)=>{
    const orders = await Order.find({})
    if (orders) {
    
      res.json(orders);
    } else {
      res.status(401);
      throw Error("Order not found");
    }
  }
))


orderRoute.get(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user","email");

    if (order) {
      res.json(order);
    } else {
      res.status(401);
      throw Error("Order not found");
    }
  })
);

module.exports = orderRoute;
