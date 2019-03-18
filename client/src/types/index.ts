//Type
export interface User {
    id: string
    login: string
    avatar: string
}
export type IsLoggedIn = User | undefined

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
    title: string | undefined
    description: string | undefined
    body: string | undefined
}

export interface NewReview {
    body: string | undefined
}

//Type Checking





export const isString = (data: any): data is string => (
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0
)

export const isUser = (data: any): data is User => (
    (<User>data) instanceof Object &&
    isString((<User>data).id) &&
    isString((<User>data).login) &&
    isString((<User>data).avatar)
)
export const isVote = (data: any): data is Vote => (
    (<Vote>data) instanceof Object &&
    isString((<Vote>data).userID) &&
    typeof (<Vote>data).value === 'boolean'
)
export const isVotes = (data: any): data is Votes => (
    (<Votes>data) instanceof Array &&
    (<Votes>data).every(vote => isVote(vote))
)
export const isReview = (data: any): data is Review => (
    (<Review>data) instanceof Object &&
    isString((<Review>data).id) &&
    isUser((<Review>data).user) &&
    isString((<Review>data).body) &&
    isString((<Review>data).created) &&
    typeof (<Review>data).isEdited === 'boolean' &&
    isVotes((<Review>data).votes)
)
export const isReviews = (data: any): data is Reviews => (
    (<Reviews>data) instanceof Array &&
    (<Reviews>data).every(review => isReview(review)) 
)
export const isArticle = (data: any): data is Article => (
    (<Article>data) instanceof Object &&
    isString((<Article>data).id) &&
    isUser((<Article>data).user) &&
    isString((<Article>data).title) &&
    isString((<Article>data).description) &&
    isString((<Article>data).body) &&
    isVotes((<Article>data).votes) &&
    isReviews((<Article>data).reviews) &&
    isString((<Article>data).created) &&
    typeof (<Article>data).isEdited === 'boolean'
)



/*
interface LoggedUser {
    user: string
}
export const isLoggedUser = (data: any): data is LoggedUser => (
    (<LoggedUser>data) instanceof Object && 
    isString((<LoggedUser>data).user)
)
*/