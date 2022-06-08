const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req,res,next) =>{
    const authorization = req.headers["authorization"];
    if (authorization){
        const token = authorization.split(" ")[1];
        try{
            req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            next();

        }catch(err){
            console.log(err);
                return res.json("Error")
      .status(400)
      .json({ success: false, message: 'Token sai hoac het han' });
        }

        // console.log(token);
    }
}