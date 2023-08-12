const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: ""
    },
    image: {
        type: Object,
        default: {}
    },
    role: {
        type: String,
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    validateEmail: {
        type: Boolean,
        default: false
    },
    validateMobile: {
        type: Boolean,
        default: false
    },
}, {
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)