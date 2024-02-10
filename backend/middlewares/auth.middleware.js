const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const {BlackListModel} = require("../models/BlackListTokenModel")

const auth = async(req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        const blackToken = await BlackListModel.findOne({token})
        if (blackToken){
            res.send({"msg":"Please Login"})
        } else{
            jwt.verify(token, process.env.AccessKey, (err, decoded)=>{
                if(err){
                    res.send({"msg": "Token Expires"})
                } else {
                    req.body.userId = decoded.userId
                    next()
                }
            })
        }
    } else{
        res.send({"msg":"Token not Found"})
    }
}

module.exports = {auth}