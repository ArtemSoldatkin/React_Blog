const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = 'supersecretblogphrase'

const response = (errorCode, user = null, token = null) => {
    const status = errorCode ? false : true
    let message = "Успешно!"    
    switch (errorCode) {
        case 400: message = "Логин или пароль заполнены не верно!"; break
        case 401: message = "Авторизуйтесь!"; break
        case 404: message = "Пользователь не найден!"; break
        case 409: message = "Логин занят!"; break
        case 500: message = "Ошибка сервера, попробуйте позже!"; break
    }
    return {status, message, user, token}
}

module.exports = {
    Mutation: {
        addUser: async(_, args) => {
            try {                              
                args.password = await bcrypt.hash(args.password, 8)   
                if(!args.password) return response(500)                
                let user = await User.create(args)   
                if(!user) return response(500)
                const token = await jwt.sign({ id: user._id }, secret, { expiresIn: 86400 }); 
                if(!token) response(500)
                const {login, avatar} = user                
                return response(null, {login, avatar}, token) 
            } catch (err) { 
                if(err && err.name === "ValidationError") return response(409)
                return response(500)
            }
        },
        editUser: async(_, args, {userID}) => {
            try {    
                if(!userID) return response(401)
                const user = User.findByIdAndUpdate(userID, args, {new: true})
                if(!user) return response(404)
                const {login, avatar} = user
                return response(null, {login, avatar})          
            } catch (err) { 
                return response(500) 
            }
        },
        login: async(_, args) => {
            try {
                const user = await User.findOne({login: args.login})                 
                if(!user) return response(404)              
                const res = await bcrypt.compare(args.password, user.password)                   
                if(!res) return response(400) 
                const token = await jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });               
                if(!token) return response(500)
                const {login, avatar} = user                
                return response(null, {login, avatar}, token)
            } catch (err) {
                return response(500) 
            }
        }
    }
}
