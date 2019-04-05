import mongoose from 'mongoose';
import { Article } from '../types/article';

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    votes: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            value: Boolean,
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
});

interface ArticleModel extends Article, mongoose.Document {}
export default mongoose.model<ArticleModel>('Article', articleSchema);
