import {Vote} from './index'

export interface Article {   
    user: string
    title: string
    description: string
    body: string
    reviews: string[]
    vote: Vote[]
    created: Date
    isEdited: boolean
}