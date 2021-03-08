const express =  require('express')
//for handling more routes
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')
const Author = require('../models/Author')
const Post = require('../models/Post')

router.get('/', (req,res,next) => {
    Category.find({status:true}, function (err, category) {
    if (err){
        res.status(204).json({message:"Something went wrong"})
    }else{
        res.status(200).json({message:"ALL OK!!", data:category})
    }
})
})

router.post('/', async (req,res,next) => {
    let a = await Category.findOne({categoryName:req.body.categoryName})
    // console.log(a)
    if (!a) {
        const category = new Category({
            categoryName: req.body.categoryName,
            authorName: req.body.authorName,
        })
        if (!category.categoryName || !category.authorName){
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

router.post('/:id/activate', (req,res,next) => {
    Category.updateOne({_id:req.params.id},{status:true},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.post('/:id/deactivate', (req,res,next) => {
    Category.updateOne({_id:req.params.id},{status:false},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.put ('/:id', async (req,res,next) => {
    const category = {
        categoryName:req.body.categoryName,
        authorName: req.body.authorName,
    }
    await Category.updateOne({_id:req.params.id},category,function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.delete('/:id', (req,res,next) => {
    // const category = {
    //     categoryName:req.body.categoryName,
    //     authorName: req.body.authorName,
    // }
    Category.deleteOne({_id:req.params.id},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

module.exports = router
