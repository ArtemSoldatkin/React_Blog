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

module.exports = {
    Query: {
        getArticle: async(_, args)  => {
            try {
                const article = await Article.findById(args)
                if(!article) return response(404)
                return response(null, article)
            } catch (err) { return response(500)}
        },
        getArticles: async(_, args)  => {
            try {
                const search = args.search ? new RegExp(search.trim(), 'i') : new RegExp('', 'i')
                const user = args.user ? new RegExp(user, 'i') : new RegExp('', 'i')
                const articles = await Article.find(
                    {$and: [
                        {user}, {$or: [
                            {title: search},
                            {description: search}                            
                        ]}
                    ]}
                )
                if(!articles) return response(404)
                return response(null, articles)
            } catch (err) { return response(500)}
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
        addArticle: async(_, args, userID)  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)
                const article = await Article.create(args)
                if(!article) return response(500)
                return response(null, article)    
            } catch (err) { return response(500)}
        },
        editArticle: async(_, args, userID)  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)
                const {id, title, description} = args
                const article = await Article.findByIdAndUpdate(id, {title, description}, {new: true})
                if(!article) return response(404)
                return response(null, article)
            } catch (err) { return response(500)}
        },
        removeArticle: async(_, args, userID)  => {
            try {
                if(!userID) return response(401)
                if(!args) return response(400)
                const article = await Article.findByIdAndDelete(args)
                if(!article) return response(404)
                return response(null)
            } catch (err) { return response(500)}
        },
        setVoteArticle: async(_, args, userID)  => {
            try {
                if(!user) return response(401)
                if(!args) return response(400)
                const {id, vote: value} = args
                const article = await Article.findById(id)
                if(!article) return response(404)
                article.vote.push({userID, value})
            } catch (err) { return response(500)}
        }
    }
}
