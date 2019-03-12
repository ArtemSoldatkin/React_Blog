import {Vote} from './index'

export interface Review {
    user: string
    body: string
    vote: Vote[]
    created: Date
    isEdited: boolean
}
