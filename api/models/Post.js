const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postName: { type: String, required: true,index: true },
    authorName: { type: String, required: true,index: true },
    categoryName: { type: String, required: true,index: true },
    categoryId: {type: mongoose.Schema.Types.ObjectId,ref: 'Category',required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId,ref: 'Author',required: true},
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})


module.exports = mongoose.model('Post',postSchema)