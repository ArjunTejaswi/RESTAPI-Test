const express =  require('express')
//for handling more controllers
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')
const Author = require('../models/Author')
const Post = require('../models/Post')
const auth = require('../config/authService')

router.get('/', auth.authenticated,(req,res,next) => {
    Author.find({status:true,deleted:false}, function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.post('/', auth.authenticated,async (req,res,next) => {
    let a = await Author.findOne({blogName:req.body.blogName})
    if (!a) {
        const author = new Author({
            authorName: req.body.authorName,
            blogName: req.body.blogName,
            categoryName: req.body.categoryName,
            categoryId:req.body.categoryId
        })
        if (!author.authorName || !author.blogName || !author.categoryName){
            res.status(200).json({message:"You have missed either categoryName or authorName or blogName"})
        }else {
            author.save(function (err, author) {
                if (err) {
                    res.status(204).json({message: "Something went wrong"})
                } else {
                    res.status(200).json({message: "ALL OK!!", data: author})
                }
            })
        }
    }else{
        res.status(200).json({message:"This category is already exists"})
    }
})

router.post('/:id/activate', auth.authenticated,(req,res,next) => {
    Author.updateOne({_id:req.params.id},{status:true},function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.post('/:id/deactivate', auth.authenticated,(req,res,next) => {
    Author.updateOne({_id:req.params.id},{status:false},function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.patch('/:id', auth.authenticated,async (req,res,next) => {
    const author = {
        authorName: req.body.authorName,
        blogName:req.body.blogName,
    }
        await Author.updateOne({ _id:req.params.id },author,async function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.delete('/:id', auth.authenticated,(req,res,next) => {
    Author.updateOne({_id:req.params.id},{deleted:true},function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

module.exports = router
