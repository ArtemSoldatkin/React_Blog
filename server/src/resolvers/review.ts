import { ApolloError } from 'apollo-server-express';
import Article from '../models/article';
import Review from '../models/review';
import * as _r from '../types/review';
import { Vote, NewVote, isNewVote, Context } from '../types';

const msg = (errorCode: number | null): string => {
    switch (errorCode) {
        case 400:
            return 'Комментарий не заполнен!';
        case 401:
            return 'Авторизуйтесь!';
        case 404:
            return 'Данные не найдены!';
        case 500:
            return 'Ошибка сервера, попробуйте позже!';
        default:
            return 'Успешно!';
    }
};

const ReviewRes = (errorCode: number | null, reviews: _r.Review[] | null = null) => {
    const success = errorCode ? false : true;
    const message = msg(errorCode);
    if (!success) return new ApolloError(message, `${errorCode}`);
    return { success, message, reviews };
};
const ReviewVoteRes = (errorCode: number | null, votes: Vote[] | null = null) => {
    const success = errorCode ? false : true;
    const message = msg(errorCode);
    if (!success) return new ApolloError(message, `${errorCode}`);
    return { success, message, votes };
};

export default {
    Mutation: {
        addReview: async (_: any, args: _r.NewReview, { userID }: Context) => {
            try {
                if (!userID) return ReviewRes(401);
                if (!_r.isNewReview(args)) return ReviewRes(400);
                const { id, body } = args;
                const data = { body, user: userID };
                const review = await Review.create(data);
                if (!review) return ReviewRes(500);
                const article = await Article.findByIdAndUpdate(
                    id,
                    { $push: { reviews: review._id } },
                    { new: true }
                ).populate({
                    path: 'reviews',
                    populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                });
                if (!article) return ReviewRes(404);
                return ReviewRes(null, article.reviews);
            } catch (err) {
                return ReviewRes(500);
            }
        },
        editReview: async (_: any, args: _r.NewReview, { userID }: Context) => {
            try {
                if (!userID) return ReviewRes(401);
                if (!_r.isNewReview(args)) return ReviewRes(400);
                const { id, body } = args;
                const data = { body, isEdited: true, created: Date.now() };
                const review = await Review.findByIdAndUpdate(id, data);
                if (!review) return ReviewRes(404);
                const article = await Article.findOne({ reviews: id }).populate({
                    path: 'reviews',
                    populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                });
                if (!article) return ReviewRes(404);
                return ReviewRes(null, article.reviews);
            } catch (err) {
                return ReviewRes(500);
            }
        },
        removeReview: async (_: any, args: _r.RemoveReview, { userID }: Context) => {
            try {
                if (!userID) return ReviewRes(401);
                if (!_r.isRemoveReview(args)) return ReviewRes(400);
                const { id } = args;
                const article = await Article.findOneAndUpdate(
                    { reviews: id },
                    { $pull: { reviews: id } }
                ).populate({
                    path: 'reviews',
                    populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                });
                if (!article) return ReviewRes(404);
                return ReviewRes(null, article.reviews);
            } catch (err) {
                return ReviewRes(500);
            }
        },
        setVoteReview: async (_: any, args: NewVote, { userID }: Context) => {
            try {
                if (!userID) return ReviewVoteRes(401);
                if (!isNewVote(args)) return ReviewVoteRes(400);
                const { id, vote: value } = args;
                const review = await Review.findById(id);
                if (!review) return ReviewVoteRes(404);
                const index = review.votes.findIndex(vote => vote.userID == userID);
                if (index !== -1) {
                    if (review.votes[index].value === value)
                        review.votes = review.votes.filter(vote => vote.userID != userID);
                    else review.votes[index].value = value;
                } else review.votes.push({ userID, value });
                const savedReview = await review.save();
                if (!savedReview) return ReviewVoteRes(500);
                return ReviewVoteRes(null, savedReview.votes);
            } catch (err) {
                return ReviewVoteRes(500);
            }
        },
    },
};
