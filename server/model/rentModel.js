const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    rentDate: {
        type: Date,
        default: new Date().toLocaleString()
    },
    returnDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    }
},{
    collection: "rent",
    timestamps: true
})

module.exports = mongoose.model("Rent", rentSchema)