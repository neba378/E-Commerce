const express = require("express");

const userRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");

// login
userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email");
    }
  })
);

// register
userRoute.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(400);
      throw Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    }
  })
);

// profile

userRoute.get(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);


userRoute.put("/profile", protect, AsyncHandler(
  async (req,res) => {
    const user = await User.findById(req.user._id);
    const checkEmail = await User.findOne({email:req.body.email});
    
    if (checkEmail && checkEmail._id.toString() !== req.user._id.toString()) {
      throw new Error("Email already taken");
    }
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password){
        user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
        createdAt: updatedUser.createdAt,
      });
    }

    else{
      res.status(401)
      throw new Error("User not found")
    }
  }
))

module.exports = userRoute;
