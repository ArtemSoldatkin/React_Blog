import mongoose from 'mongoose';
import { Review } from '../types/review';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
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

interface ReviewModel extends Review, mongoose.Document {}
export default mongoose.model<ReviewModel>('Review', reviewSchema);
