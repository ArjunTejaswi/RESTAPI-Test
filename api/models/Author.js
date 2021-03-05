const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    authorName: { type: String, required: true,index: true },
    blogName:{ type: String, required: true,index: true },
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})

module.exports = mongoose.model('Author',authorSchema)