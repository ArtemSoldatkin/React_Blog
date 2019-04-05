import Article from '../models/article';
import { ApolloError } from 'apollo-server-express';
import * as _a from '../types/article';
import { Vote, NewVote, isNewVote, Context } from '../types';

const msg = (errorCode: number | null): string => {
    switch (errorCode) {
        case 400:
            return 'Название статьи или описание не заполнено!';
        case 401:
            return 'Авторизуйтесь!';
        case 404:
            return 'Статья не найдена!';
        case 500:
            return 'Ошибка сервера, попробуйте позже!';
        default:
            return 'Успешно!';
    }
};

const articleRes = (errorCode: number | null, article: _a.Article | null = null) => {
    const success = errorCode ? false : true;
    const message = msg(errorCode);
    if (!success) return new ApolloError(message, `${errorCode}`);
    return { success, message, article };
};
const articlesRes = (errorCode: number | null, articles: _a.Article[] | null = null) => {
    const success = errorCode ? false : true;
    const message = msg(errorCode);
    if (!success) return new ApolloError(message, `${errorCode}`);
    return { success, message, articles };
};
const articleVoteRes = (errorCode: number | null, votes: Vote[] | null = null) => {
    const success = errorCode ? false : true;
    const message = msg(errorCode);
    if (!success) return new ApolloError(message, `${errorCode}`);
    return { success, message, votes };
};

export default {
    Query: {
        getArticle: async (_: any, args: _a.GetArticle) => {
            try {
                if (!_a.isGetArticle(args)) return articleRes(400);
                const { id } = args;
                const article = await Article.findById(id)
                    .populate('user', ['_id', 'login', 'avatar'])
                    .populate({
                        path: 'reviews',
                        populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                    });
                if (!article) return articleRes(404);
                return articleRes(null, article);
            } catch (err) {
                return articleRes(500);
            }
        },
        getArticles: async (_: any, args: _a.GetArticles) => {
            try {
                if (!_a.isGetArticles(args)) return articlesRes(400);
                const query = args.user ? { user: args.user } : {};
                const articles = await Article.find(query)
                    .populate('user', ['_id', 'login', 'avatar'])
                    .populate({
                        path: 'reviews',
                        populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                    });
                if (!articles) return articlesRes(404);
                return articlesRes(null, articles);
            } catch (err) {
                return articlesRes(500);
            }
        },
    },
    Mutation: {
        addArticle: async (_: any, args: _a.AddArticle, { userID }: Context) => {
            try {
                if (!_a.isAddArticle(args)) return articleRes(400);
                if (!userID) return articleRes(401);
                const newArticle = { ...args, user: userID };
                const article = await Article.create(newArticle);
                if (!article) return articleRes(500);
                const _article = await Article.findById(article._id)
                    .populate('user', ['_id', 'login', 'avatar'])
                    .populate({
                        path: 'reviews',
                        populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                    });
                if (!_article) return articleRes(500);
                return articleRes(null, _article);
            } catch (err) {
                return articleRes(500);
            }
        },
        editArticle: async (_: any, args: _a.EditArticle, { userID }: Context) => {
            try {
                if (!_a.isEditArticle(args)) return articleRes(400);
                if (!userID) return articleRes(401);
                const { id } = args;
                let data: _a.EditData = { created: Date.now(), isEdited: true };
                for (let i in args) {
                    if ((i === 'title' || i === 'description' || i === 'body') && args[i] !== '')
                        data[i] = args[i];
                }
                const article = await Article.findByIdAndUpdate(id, data, { new: true })
                    .populate('user', ['_id', 'login', 'avatar'])
                    .populate({
                        path: 'reviews',
                        populate: { path: 'user', select: ['_id', 'login', 'avatar'] },
                    });
                if (!article) return articleRes(404);
                return articleRes(null, article);
            } catch (err) {
                return articleRes(500);
            }
        },
        removeArticle: async (_: any, args: _a.RemoveArticle, { userID }: Context) => {
            try {
                if (!_a.isRemoveArticle(args)) return articleRes(400);
                if (!userID) return articleRes(401);
                const { id } = args;
                const article = await Article.findByIdAndDelete(id);
                if (!article) return articleRes(404);
                return articleRes(null);
            } catch (err) {
                return articleRes(500);
            }
        },
        setVoteArticle: async (_: any, args: NewVote, { userID }: Context) => {
            try {
                if (!userID) return articleVoteRes(401);
                if (!isNewVote(args)) return articleVoteRes(400);
                const { id, vote: value } = args;
                const article = await Article.findById(id);
                if (!article) return articleVoteRes(404);
                const index = article.votes.findIndex(vote => vote.userID == userID);
                if (index !== -1) {
                    if (article.votes[index].value === value)
                        article.votes = article.votes.filter(vote => vote.userID != userID);
                    else article.votes[index].value = value;
                } else article.votes.push({ userID, value });
                const savedArticle = await article.save();
                if (!savedArticle) return articleVoteRes(500);
                return articleVoteRes(null, savedArticle.votes);
            } catch (err) {
                return articleVoteRes(500);
            }
        },
    },
};
