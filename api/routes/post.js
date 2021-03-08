const express =  require('express')
//for handling more routes
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')
const Author = require('../models/Author')
const Post = require('../models/Post')
router.get('/', (req,res,next) => {
    Post.find( function (err, post) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:post})
        }
    })
})

router.post('/', async (req,res,next) => {
    let a = await Post.findOne({categoryName:req.body.categoryName})
    if (!a) {
        const posts = new Post({
            postName: req.body.postName,
            authorName: req.body.authorName,
            categoryName: req.body.categoryName,
            categoryId:req.body.categoryId,
            authorId:req.body.authorId
        })
        if (!posts.categoryName || !posts.authorName || !posts.postName){
            res.status(200).json({message:"You have missed either categoryName or authorName or postName"})
        }else {
            posts.save(function (err, post) {
                if (err) {
                    res.status(204).json({message: "Something went wrong"})
                } else {
                    res.status(200).json({message: "ALL OK!!", data: post})
                }
            })
        }
    }else {
        res.status(200).json({message:"This post already exists"})
    }
})

router.post('/:id/publish', (req,res,next) => {
    Post.updateOne({_id:req.params.id},{status:true},function (err, post) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:post})
        }
    })
})

router.post('/:id/unpublish', (req,res,next) => {
    Post.updateOne({_id:req.params.id},{status:false},function (err, post) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:post})
        }
    })
})

router.put ('/:id', async (req,res,next) => {
    const post = {
        postName:req.body.postName,
        authorName: req.body.authorName,
        categoryName: req.body.categoryName,
        categoryId:req.body.categoryId,
        authorId:req.body.authorId
    }
    await Category.updateMany({_id:post.categoryId},{authorName:post.authorName})
    await Author.updateMany({categoryId:post.categoryId},{authorName:post.authorName})
    Post.updateOne({_id:req.params.id},post,function (err, post) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            Post.updateOne({_id:req.params.id})
                res.status(200).json({message:"ALL OK!!", data:post})
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
