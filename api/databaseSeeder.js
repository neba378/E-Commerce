const router = require("express").Router();

const products = require("./data/Products");
const users = require("./data/Users");
const Product = require("./models/Product");
const User = require("./models/User");
const AsyncHandler = require("express-async-handler");

router.post(
  "/users",
  AsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const userList = await User.insertMany(users);
    res.send({ userList });
  })
);

router.post(
  "/products",
  AsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const productList = await Product.insertMany(products);
    res.send(productList);
  })
);

module.exports = router;
