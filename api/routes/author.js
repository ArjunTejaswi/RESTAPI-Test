const express =  require('express')
//for handling more routes
const router = express.Router()
const mongoose = require('mongoose')
const Author = require('../models/Author')
router.get('/', (req,res,next) => {
    Author.find( function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.post('/', (req,res,next) => {
    const author = new Author({
        authorName: req.body.authorName,
        blogName:req.body.blogName,
    })
    author.save(function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.put ('/:id', (req,res,next) => {
    const author = {
        authorName: req.body.authorName,
        blogName:req.body.blogName,
    }
    console.log(req.params.id)
    Author.updateOne({_id:req.params.id},author,function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

router.delete('/:id', (req,res,next) => {
    Author.deleteOne({_id:req.params.id},function (err, author) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:author})
        }
    })
})

module.exports = router
