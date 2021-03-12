const express =  require('express')
//for handling more controllers
const router = express.Router()
const Category = require('../models/Category')
const auth = require('../config/authService')

router.get('/', auth.authenticated,(req,res,next) => {
    Category.find({status:true,deleted:false}, function (err, category) {
    if (err){
        res.status(204).json({message:"Something went wrong"})
    }else{
        res.status(200).json({message:"ALL OK!!", data:category})
    }
})
})

router.post('/', auth.authenticated,async (req,res,next) => {
    let a = await Category.findOne({categoryName:req.body.categoryName})
    // console.log(a)
    if (!a) {
        const category = new Category({
            categoryName: req.body.categoryName,
            // authorName: req.body.authorName,
        })
        if (!category.categoryName){
            res.status(200).json({message:"You have missed either categoryName or authorName"})
        }else {
            category.save(function (err, category) {
                if (err) {
                    res.status(204).json({message: "Something went wrong"})
                } else {
                    res.status(200).json({message: "ALL OK!!", data: category})
                }
            })
        }
    }else {
        res.status(200).json({message:"This category is already exists"})
    }
})

router.post('/:id/activate', auth.authenticated,(req,res,next) => {
    Category.updateOne({_id:req.params.id},{status:true},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.post('/:id/deactivate', auth.authenticated,(req,res,next) => {
    Category.updateOne({_id:req.params.id},{status:false},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.patch('/:id', auth.authenticated,async (req,res,next) => {
    const category = {
        categoryName:req.body.categoryName,
    }
     Category.updateOne({ _id: req.params.id },category,function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.delete('/:id', auth.authenticated,(req,res,next) => {
    // const category = {
    //     categoryName:req.body.categoryName,
    //     authorName: req.body.authorName,
    // }
    Category.updateOne({_id:req.params.id},{deleted:true},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

module.exports = router
