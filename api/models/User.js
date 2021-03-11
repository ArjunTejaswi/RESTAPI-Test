const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: false,index: true },
    phoneNumber: { type: Number, required: false,index: true },
    email: { type: String, required: false,unique: true },
    password: { type: String, required: false,index: true },
    createdAt: { type: Date, default: Date.now, index: true},
    updatedAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true, index: true },
    deleted: { type: Boolean, default: false, index: true }
})

userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

const User = mongoose.model('User',userSchema)
module.exports = User

module.exports.hashThePassword = async function (newpassword) {
    const saltRounds = 10
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(newpassword, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    })
    return hashedPassword
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err
        callback(null, isMatch)
    })
}
module.exports.validate = (data) => {
    if (!data || ((typeof data === 'string') ? data.trim() : data) === '') {
        return false
    } else {
        return true
    }
}

module.exports.validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}