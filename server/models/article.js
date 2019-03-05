const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    vote: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        value: Boolean
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

module.exports = mongoose.model('Article', articleSchema)
