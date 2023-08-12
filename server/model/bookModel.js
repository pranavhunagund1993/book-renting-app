const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    rentCost: {
        type: Number,
        required: true
    },
    isAvailable: {
        type:Boolean,
        default: true
    },
    numberOfCopy: {
        type: Number,
        required: true
    },
    rentedCopies: {
        type: Number,
        default: 0
    },
    image: {
        type: Object,
        default: {
            url: "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
        }
    },
    isbn: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
    collection: "books",
    timestamps: true
})

module.exports = mongoose.model("Book", bookSchema)