import * as _t from './index';

//TYPES
export interface Review {
    user: string;
    body: string;
    votes: _t.Vote[];
    created: Date;
    isEdited: boolean;
}
export interface NewReview {
    id: string;
    body: string;
}
export interface RemoveReview {
    id: string;
}

//TYPE CHECKING
export const isNewReview = (data: any): data is NewReview =>
    <NewReview>data instanceof Object &&
    _t.isString((<NewReview>data).id) &&
    _t.isString((<NewReview>data).body);
export const isRemoveReview = (data: any): data is RemoveReview =>
    <RemoveReview>data instanceof Object && _t.isString((<RemoveReview>data).id);
