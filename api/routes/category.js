const express =  require('express')
//for handling more routes
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/Category')
router.get('/', (req,res,next) => {
Category.find( function (err, category) {
    if (err){
        res.status(204).json({message:"Something went wrong"})
    }else{
        res.status(200).json({message:"ALL OK!!", data:category})
    }
})
})

router.post('/', (req,res,next) => {
    const category = new Category({
        authorName: req.body.authorName,
    })
    category.save(function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.post('/:id', (req,res,next) => {
    const category = new Category({
        authorName: req.body.authorName,
    })
    Category.updateOne({_id:req.params.id},{authorName:category.authorName},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})

router.delete('/:id', (req,res,next) => {
    const category = new Category({
        authorName: req.body.authorName,
    })
    Category.deleteOne({_id:req.params.id},function (err, category) {
        if (err){
            res.status(204).json({message:"Something went wrong"})
        }else{
            res.status(200).json({message:"ALL OK!!", data:category})
        }
    })
})
module.exports = router
