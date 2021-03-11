const mongoose = require('mongoose')
const Author = require('../models/Author')
const Post = require('../models/Post')

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true,index: true },
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})
categorySchema.post('updateOne', async function() {
    let data = this.getQuery()
    let record = await Category.findOne({ _id: data._id }).exec()
    console.log("123",record._id)
    if(record){
        if(record.deleted === false) {
            await Author.updateMany({ categoryId: record._id },
                {
                    categoryName: record.categoryName,
                }).exec()
            await Post.updateMany({ categoryId: record._id },
                {
                    categoryName:record.categoryName,
                }).exec()
            // for (let i = 0; i < record.serviceCategories.length; i++) {
            //     await PartnerService.updateMany(
            //         { serviceId: record._id, 'serviceCategories.serviceCategoryId': record.serviceCategories[i]._id },
            //         { $set: {
            //                 'serviceCategories.$.serviceCategoryId':record.serviceCategories[i]._id,
            //                 'serviceCategories.$.serviceCategoryName': record.serviceCategories[i].serviceCategoryName,
            //                 'serviceCategories.$.serviceCategoryNameSp': record.serviceCategories[i].serviceCategoryNameSp,
            //                 'serviceCategories.$.serviceCategoryRepeats': record.serviceCategories[i].serviceCategoryRepeats,
            //                 'serviceCategories.$.serviceCategoryBookingType': record.serviceCategories[i].serviceCategoryBookingType
            //             }
            //         }).exec()
            // }
        } else {
            await Author.updateMany({ categoryId: record._id }, { deleted: true }).exec()
            await Post.updateMany({ categoryId: record._id }, { deleted: true }).exec()
        }
    }
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category


