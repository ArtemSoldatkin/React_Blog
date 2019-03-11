const Article = require('../models/article')

const response = (errorCode, articles = null) => {
    const status = errorCode ? false : true
    let message = "Успешно!"    
    switch (errorCode) {
        case 400: message = "Название статьи или описание не заполнено!"; break
        case 401: message = "Авторизуйтесь!"; break
        case 404: message = "Статья не найдена!"; break        
        case 500: message = "Ошибка сервера, попробуйте позже!"; break
    }
    return {status, message, articles}
}

const responseV = (errorCode, votes = null) => {
    const status = errorCode ? false : true
    let message = "Успешно!"    
    switch (errorCode) {
        case 400: message = "Название статьи или описание не заполнено!"; break
        case 401: message = "Авторизуйтесь!"; break
        case 404: message = "Статья не найдена!"; break        
        case 500: message = "Ошибка сервера, попробуйте позже!"; break
    }
    return {status, message, votes}
}

module.exports = {
    Query: {
        getArticle: async(_, args)  => {
            try {
                console.log('args', args)
                const {id} = args
                console.log('id', id)
                //if(!id) response(400)
                const article = await Article.findById(id).populate('user', ['_id', 'login', 'avatar'])
                if(!article) return response(404)
                return response(null, article)
            } catch (err) { return response(500)}
        },
        getArticles: async(_, args)  => {
            try {
                //console.log('ok')
               // const search = args.search ? new RegExp(search.trim(), 'i') : new RegExp('', 'i')
                //const user = args.user ? new RegExp(user, 'i') : new RegExp('', 'i')
                //const articles = await Article.find().populate('user', ['_id', 'login', 'avatar'])
               
                /*const articles = await Article.find(
                    {$and: [
                        {user}, 
                        {$or: [
                            {title: search},
                            {description: search}                            
                        ]}
                    ]}
                ).populate('user', ['_id', 'login', 'avatar'])*/    
                let articles = await Article.find().populate('user', ['_id', 'login', 'avatar'])                
                if(!articles) return response(404)               
                if(args.user)articles = articles.filter(article => article.user._id == args.user)
                   
                const res = response(null, articles)
                //console.log('asd', res)
                return res
                //return response(null, articles)
            } catch (err) {                 
                return response(500)}
        },
        getMyArticles: async(_, args, userID)  => {
            try {
                if(!userID) return response(401)
                const articles = await Article.find({user: userID})
                if(!articles) return response(404)
                return response(null, articles)
            } catch (err) { return response(500)}
        }
    },
    Mutation: {
        addArticle: async(_, args, {userID})  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)                
                args.user = userID                
                const article = await Article.create(args)
                if(!article) return response(500)
                return response(null, article)    
            } catch (err) { return response(500)}
        },
        editArticle: async(_, args, {userID})  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)
                const {id, title, description} = args
                const article = await Article.findByIdAndUpdate(id, {title, description}, {new: true})
                if(!article) return response(404)
                return response(null, article)
            } catch (err) { return response(500)}
        },
        removeArticle: async(_, args, {userID})  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)
                const article = await Article.findByIdAndDelete(args)
                if(!article) return response(404)
                return response(null)
            } catch (err) { return response(500)}
        },
        setVoteArticle: async(_, args, {userID})  => {
            try {                
                if(!userID) return responseV(401)
                if(!args) return responseV(400)
                const {id, vote: value} = args
                const article = await Article.findById(id)
                if(!article) return responseV(404)
                const index = article.vote.findIndex(vote => vote.userID == userID)
                console.log('index', index)
                if(index !== -1){
                    if(article.vote[index].value === value) article.vote = article.vote.filter(vote => vote.userID != userID)
                    else article.vote[index].value = value
                } 
                else article.vote.push({userID, value})
                console.log('article.vote', article.vote)
                const savedArticle = await article.save()                
                if(!savedArticle) return responseV(500)                
                return responseV(null, savedArticle.vote)   
            } catch (err) {               
                 return responseV(500)
            }
        }
    }
}
