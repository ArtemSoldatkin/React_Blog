//Type
export interface User {
    id: string
    login: string
    avatar: string
}

export interface Vote {
    userID: string
    value: boolean
}

export type Votes = Vote[]

export interface Review {
    id: string
    user:User
    body: string
    created: string
    isEdited: boolean
    votes: Votes
}
export type Reviews = Review[]

export interface Article {
    id: string
    user: User
    title: string
    description: string
    body: string
    votes: Votes
    reviews: Review[]
    created: string
    isEdited: boolean
}

export type Articles = Article[]

export interface NewArticle {
    title: string
    description: string
    body: string
}

//Type Checking





export const isString = (data: any): data is string => (
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0
)