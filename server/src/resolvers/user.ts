import {ApolloError} from 'apollo-server-express'
import User from '../models/user'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {secret} from '../constants'
import {Context} from '../types'
import * as _u from '../types/user'

const msg = (errorCode: number | null): string => {
    switch (errorCode) {
        case 400: return "Даныне заполнены не верно!"
        case 401: return "Авторизуйтесь!"
        case 404: return "Пользователь не найден!"
        case 409: return "Логин занят!"
        case 500: return "Ошибка сервера, попробуйте позже!"
        default: return "Успешно!"
    }
}
const userResponse = (errorCode: number | null, user: _u.ResponseUser | null = null, token: string | null = null ) => {
    const success = errorCode ? false : true
    const message = msg(errorCode)
    return {success, message, user, token}
}
const userOperationsResponse = (errorCode: number | null, user: _u.ResponseUser | null = null) => {
    const success = errorCode ? false : true
    const message = msg(errorCode)
    return {success, message, user}
}


export default ({    
    Mutation: {
        addUser: async(_: any, args: _u.AddUser) => {
            try {     
                if(!_u.isAddUser(args)) return userResponse(400) 
                args.password = await bcrypt.hash(args.password, 8)   
                if(!args.password) return userResponse(500) 
                const user = await User.create(args) 
                if(!user) return userResponse(500)
                const token = await jwt.sign({ id: user._id }, secret, { expiresIn: 86400 }); 
                if(!token) return userResponse(500)
                const {_id: id, login, avatar} = user
                return userResponse(null, {id, login, avatar}, token)    
            } catch (err) { 
                if(err && err.name === "ValidationError") return new ApolloError("Логин занят", "409");
                //userResponse(409)
                return userResponse(500)
            }
        },
        editUser: async(_: any, args: _u.EditUser, {userID}: Context) => {
            try {    
                if(!userID) return userOperationsResponse(401)
                if(!_u.isEditUser(args)) return userOperationsResponse(400)
                const user = await User.findByIdAndUpdate(userID, args, {new: true})
                if(!user) return userOperationsResponse(404)
                const {_id: id, login, avatar} = user
                return userOperationsResponse(null, {id, login, avatar})          
            } catch (err) { 
                return userOperationsResponse(500) 
            }
        },
        login: async(_: any, args: _u.Login) => {
            try {
                if(!_u.isLogin(args)) return userResponse(400) 
                const user = await User.findOne({login: args.login})
                if(!user) return userResponse(404)              
                const res = await bcrypt.compare(args.password, user.password)                   
                if(!res) return userResponse(400) 
                const token = await jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });               
                if(!token) return userResponse(500)
                const {_id: id, login, avatar} = user                
                return userResponse(null, {id, login, avatar}, token)
            } catch (err) {
                return userResponse(500) 
            }
        }
    }
})
