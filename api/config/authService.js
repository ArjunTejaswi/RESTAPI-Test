const env = require('../config/env')
const jwt = require('jsonwebtoken')
const User = require("../models/User");

module.exports.authenticated =  (req, res, next) => {
    const token = req.headers['refresh_token']
    if (token) {
        jwt.verify(token, env.jwtSecretKey, function(err, decoded) {
            if (err) {
                return res.status(401).json({ status: false, message: 'Unauthorized access.' })
            }
            req.decoded = decoded
            User.findOne({ email: decoded.email, deleted: false}, function(err, user){
                if(err){
                    return res.status(401).json({ status: false, message: err })
                }
                if (user) {
                    let currentUser
                    currentUser = {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                    req.user = currentUser
                    next()
                }
            })
        })
    } else {
        return res.status(401).json({ success: false, message: 'Unauthorized access.' })
    }
}