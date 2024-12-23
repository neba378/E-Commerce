const express = require("express");

const userRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");

userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email");
    }
  })
);

userRoute.post('/', 
    AsyncHandler(async(req,res)=>{
        const {name, email, password} = req.body;
        const existUser = await User.findOne({email:email})
        if (existUser){
            res.status(400)
            throw Error("User already exists")
        }

        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                createdAt:user.createdAt
            })
        }
    })
)

module.exports = userRoute;
