const mongoose = require('mongoose')
const Author = require('../models/Author')


const postSchema = mongoose.Schema({
    postName: { type: Array, required: true,index: true },
    authorName: { type: String, required: true,index: true },
    categoryName: { type: String, required: true,index: true },
    categoryId: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId,ref: 'Author',required: true},
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})

postSchema.post('updateOne', async function() {
    let data = this.getQuery()
    let record = await Post.findOne({ _id: data._id }).exec()
    // console.log("123",record)
    if(record){
        if(record.deleted === false) {
            await Author.updateOne({ _id: record.authorId },
                {
                    authorName: record.authorName,blogName:record.postName
                }).exec()
        } else {
            await Post.updateOne({ _id: record._id }, { deleted: true }).exec()
        }
    }
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post