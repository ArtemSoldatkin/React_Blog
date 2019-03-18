import Article from '../models/article'
import * as _a from '../types/article'
import {Vote, NewVote, isNewVote, Context} from '../types'

const msg = (errorCode: number | null): string => {
    switch (errorCode) {
        case 400: return "Название статьи или описание не заполнено!"; 
        case 401: return "Авторизуйтесь!"; 
        case 404: return "Статья не найдена!";         
        case 500: return "Ошибка сервера, попробуйте позже!"
        default: return "Успешно!"
    }    
}

const articleResponse = (errorCode: number | null, article: _a.Article | null = null) => {
    const status = errorCode ? false : true
    const message = msg(errorCode)
    return {status, message, article}
}
const articlesResponse = (errorCode: number | null, articles: _a.Article[] | null = null) => {
    const status = errorCode ? false : true
    const message = msg(errorCode)
    return {status, message, articles}
}
const articleOperationsResponse = (errorCode: number | null) => {
    const status = errorCode ? false : true
    const message = msg(errorCode)
    console.log(message, status )
    return {status, message}
}
const articleVoteResponse = (errorCode: number | null, votes: Vote[] | null = null) => {
    const status = errorCode ? false : true
    const message = msg(errorCode)    
    return {status, message, votes}
}

export default ({
    Query: {
        getArticle: async(_: any, args: _a.GetArticle)  => {
            try {
                if(!_a.isGetArticle(args)) return articleResponse(400)
                const {id} = args  
                const article = await Article.findById(id)
                .populate('user', ['_id', 'login', 'avatar'])
                .populate({
                    path: 'reviews', 
                    populate: ({path: 'user', select: ['_id', 'login', 'avatar'] })
                })
                if(!article) return articleResponse(404)
                return articleResponse(null, article)
            } catch (err) { 
                console.log('err', err)
                return articleResponse(500)
            }
        },
        getArticles: async(_: any, args: _a.GetArticles)  => {
            try {
                if(!_a.isGetArticles(args)) return articlesResponse(400)
                const query = args.user ? {user: args.user} : {}
                const articles = await Article.find(query)
                .populate('user',['_id', 'login', 'avatar'])              
                if(!articles) return articlesResponse(404)
                return articlesResponse(null, articles)
            } catch (err) {      
                return articlesResponse(500)
            }
        }       
    },
    Mutation: {
        addArticle: async(_: any, args: _a.AddArticle, {userID}: Context)  => {
            try {
                if(!_a.isAddArticle(args)) return articleOperationsResponse(400)
                if(!userID) return articleOperationsResponse(401)                           
                const newArticle = {...args, user: userID}        
                const article = await Article.create(newArticle)
                if(!article) return articleOperationsResponse(500)
                return articleOperationsResponse(null)    
            } catch (err) {
                return articleOperationsResponse(500)
            }
        },
        editArticle: async(_: any, args: _a.EditArticle, {userID}: Context)  => {
            try {
                if(!_a.isEditArticle(args)) return articleOperationsResponse(400)
                if(!userID) return articleOperationsResponse(401)               
                const {id, title, description, body} = args
                //WARN
                interface EditData {title?: string, description?: string, body?: string, created: number, isEdited: boolean}
                let data: EditData = {created: Date.now(), isEdited: true}
                console.log('data1', data)
                for(let i in args) {                   
                    if(i === 'title' || i === 'description' || i === 'body') data[i] = args[i]                   
                }               
                console.log('data', data)
                const article = await Article.findByIdAndUpdate(id, data)
                if(!article) return articleOperationsResponse(404)
                return articleOperationsResponse(null)
            } catch (err) { 
                return articleOperationsResponse(500)
            }
        },
        removeArticle: async(_: any, args: _a.RemoveArticle, {userID}: Context)  => {
            try {                
                if(!_a.isRemoveArticle(args)) return articleOperationsResponse(400)
                if(!userID) return articleOperationsResponse(401)
                const {id} = args                
                const article = await Article.findByIdAndDelete(id)
                if(!article) return articleOperationsResponse(404)
                return articleOperationsResponse(null)
            } catch (err) { 
                return articleOperationsResponse(500)
            }
        },
        setVoteArticle: async(_: any, args: NewVote, {userID}: Context)  => {
            try {                
                if(!userID) return articleVoteResponse(401)
                if(!isNewVote(args)) return articleVoteResponse(400)
                const {id, vote: value} = args
                const article = await Article.findById(id)
                if(!article) return articleVoteResponse(404)
                const index = article.votes.findIndex(vote => vote.userID == userID)
                if(index !== -1){
                    if(article.votes[index].value === value) article.votes = article.votes.filter(vote => vote.userID != userID)
                    else article.votes[index].value = value
                } 
                else article.votes.push({userID, value})          
                const savedArticle = await article.save()                
                if(!savedArticle) return articleVoteResponse(500)                
                return articleVoteResponse(null, savedArticle.votes)   
            } catch (err) {               
                 return articleVoteResponse(500)
            }
        }
    }
})
