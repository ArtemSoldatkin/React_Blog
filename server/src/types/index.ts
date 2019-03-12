import { IncomingMessage } from "http";

//TYPES
export interface Req {
    req: IncomingMessage 
}
export interface Context {
    userID: string | null
}
export interface Vote {
    userID: string
    value: boolean
}

//TYPE CHECKING
export const isString = (data: any): data is string => (
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0
)
type OptionalString = string | undefined | null
export const isOptionalString = (data: any): data is OptionalString => (
    typeof (<OptionalString>data) === 'string'
    || (<OptionalString>data) == undefined 
    || (<OptionalString>data) === null
)
