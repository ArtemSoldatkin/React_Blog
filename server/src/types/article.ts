import * as _t from './index'
import {Review} from './review'

//TYPES
export interface Article {   
    user: string
    title: string
    description: string
    body: string
    reviews: Review[]
    votes: _t.Vote[]
    created: Date
    isEdited: boolean
}
export interface GetArticle {
    id: string
}
export interface GetArticles {
    user?: string
}
export interface AddArticle {
    title: string
    description: string
    body: string
}
export interface EditArticle {
    id: string
    title?: string
    description?: string
    body?: string
}
export interface RemoveArticle {
    id: string  
}
//TYPE CHECKING
export const isGetArticle = (data: any): data is GetArticle => (
    (<GetArticle>data) instanceof Object &&
    _t.isString((<GetArticle>data).id)
)
export const isGetArticles = (data: any): data is GetArticles => (
    (<GetArticles>data) instanceof Object &&
    _t.isOptionalString((<GetArticles>data).user)
)
export const isAddArticle = (data: any): data is AddArticle => (
    (<AddArticle>data) instanceof Object &&
    _t.isString((<AddArticle>data).title) &&
    _t.isString((<AddArticle>data).description) &&
    _t.isString((<AddArticle>data).body)
)
export const isEditArticle = (data: any): data is EditArticle => (
    (<EditArticle>data) instanceof Object &&
    _t.isString((<EditArticle>data).id) &&
    _t.isOptionalString((<EditArticle>data).title) &&
    _t.isOptionalString((<EditArticle>data).description) &&
    _t.isOptionalString((<EditArticle>data).body)
)
export const isRemoveArticle = (data: any): data is RemoveArticle => (
    (<RemoveArticle>data) instanceof Object &&
    _t.isString((<RemoveArticle>data).id)
)
