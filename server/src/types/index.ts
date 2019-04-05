import { IncomingMessage } from 'http';

//TYPES
export interface Req {
    req: IncomingMessage;
}
export interface Res {
    id: string;
}
export interface Context {
    userID: string | null;
}
export interface Vote {
    userID: string;
    value: boolean;
}
export interface NewVote {
    id: string;
    vote: boolean;
}

//TYPE CHECKING
export const isString = (data: any): data is string =>
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0;
type OptionalString = string | undefined | null;
export const isOptionalString = (data: any): data is OptionalString =>
    typeof (<OptionalString>data) === 'string' ||
    <OptionalString>data == undefined ||
    <OptionalString>data === null;
export const isNewVote = (data: any): data is NewVote =>
    <NewVote>data instanceof Object &&
    isString((<NewVote>data).id) &&
    typeof (<NewVote>data).vote === 'boolean';
export const isRes = (data: any): data is Res =>
    <Res>data instanceof Object && isString((<Res>data).id);
