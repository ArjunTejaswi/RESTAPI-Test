const express =  require('express')
//for handling more routes
const router = express.Router()
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const env = require('../config/env')
// router.get('/', (req,res,next) => {
//     User.find( {status:true,deleted:false},function (err, post) {
//         if (err){
//             res.status(204).json({message:"Something went wrong"})
//         }else{
//             res.status(200).json({message:"ALL OK!!", data:post})
//         }
//     })
// })

router.post('/login', async (req,res,next) => {
 var user = await User.findOne({email:req.body.email}).exec()
    if (user){
        User.comparePassword(req.body.password, user.password, function (err, isMatch) {
            if (err) {
                res.status(200).json({message:"Something went wrong"})
            }
            if (isMatch) {
                const payload = {
                    email: user.email,
                    userId:user._id
                }
                const options = {
                    expiresIn: '24h'
                }
                jwt.sign(payload, env.jwtSecretKey, options, (err, token) => {
                    if (err) {
                        res.status(200).json({message:"error", data:err})
                    } else {
                        res.status(200).json({message:"success", data:token})
                    }
                })
            } else {
                res.status(200).json({message:"Not Matched"})
            }
        })
    }else{
        res.status(200).json({message:'User not found'})
    }
})

router.post('/', async (req,res,next) => {
    let a = await User.findOne({email:req.body.email})
    if (!a) {
        const user = new User(req.body)
        if (!req.body.fullName || !req.body.email || !req.body.password){
            res.status(200).json({message:"You have missed some detail!!"})
        }else {
            user.save(function (err, user) {
                if (err) {
                    res.status(204).json({message: "Something went wrong"})
                } else {
                    res.status(200).json({message: "ALL OK!!", data: user})
                }
            })
        }
    }else {
        res.status(200).json({message:"This User already exists"})
    }
})


router.post('/:id', async (req,res,next) => {
    var errors = []
    if (!User.validate(req.body.fullName)) {
        errors.push('First Name is wrong.')
    }
    if (!User.validate(req.body.email)) {
        errors.push('Email is wrong.')
    }
    if (!User.validate(req.body.password)) {
        errors.push('password is wrong.')
    }
    // if (!User.validate(req.body.password_confirm)) {
    //     errors.push('confirm password is wrong.')
    // }
    if (!User.validate(req.body.phoneNumber)) {
        errors.push('Phone Number is wrong.')
    }

    if (errors.length > 0) {
        res.status(200).json( {
            message: errors
        })
    }
    var userObject = req.body
    if (userObject.password) {
        userObject.password = await User.hashThePassword(userObject.password)
        console.log(userObject.password)
    } else {
        delete userObject.password
    }
    await User.updateOne({_id:req.params.id},userObject,function (err, user) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:user})
        }
    })
})

router.delete('/:id', (req,res,next) => {
    Post.deleteOne({_id:req.params.id},function (err, post) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:post})
        }
    })
})

module.exports = router
