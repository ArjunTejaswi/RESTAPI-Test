const mongoose = require('mongoose')
const Post = require('../models/Post')

const authorSchema = new mongoose.Schema({
    authorName: { type: String, required: true,index: true },
    blogName:{ type: Array, required: true,index: true },
    categoryName: { type: String, required: true,index: true },
    categoryId: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',required: true},
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})

authorSchema.post('updateOne', async function() {
    let data = this.getQuery()
    let record = await Author.findOne({ _id: data._id }).exec()
    // console.log("123",record)
    if(record){
        if(record.deleted === false) {
            await Post.updateOne({ authorId: record._id },
                {
                    authorName: record.authorName,postName:record.blogName
                }).exec()
        } else {
            await Post.updateOne({ authorId: record._id }, { deleted: true }).exec()
        }
    }
})

const Author = mongoose.model('Author',authorSchema)
module.exports = Author