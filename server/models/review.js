const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true
    },
    attitude: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        decision: Boolean
    }],
    created: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('review', reviewSchema)
