const AsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = AsyncHandler(
    async (req,res,next) => {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){
            try{
                token = req.headers.authorization.split(" ")[1]
                const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decodeToken.id).select("-password")
                next()
            }catch(err){
                console.log(err)
            }
        }
        if (!token){
            res.status(401)
            throw new Error("Not Authorized")
        }
    }
)


module.exports = protect