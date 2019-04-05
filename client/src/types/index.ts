//TYPE
export type DocType = 'Article' | 'Review';

export interface InputData {
    title?: string;
    description?: string;
    body?: string;
}

export type InputType = 'text' | 'password';
export type MessageType = 'error' | 'success';
export type optStr = string | undefined;

export type optBool = boolean | undefined;

export interface User {
    id: string;
    login: string;
    avatar: string;
}

export type IsLoggedIn = User | undefined;

export interface Vote {
    userID: string;
    value: boolean;
}

export type Votes = Vote[];

export interface Review {
    id: string;
    user: User;
    body: string;
    created: string;
    isEdited: boolean;
    votes: Votes;
}

export type Reviews = Review[];

export interface Article {
    id: string;
    user: User;
    title: string;
    description: string;
    body: string;
    votes: Votes;
    reviews: Review[];
    created: string;
    isEdited: boolean;
}

export type Articles = Article[];

export interface NewArticle {
    title: optStr;
    description: optStr;
    body: optStr;
}

export interface NewReview {
    body: optStr;
}

//TYPE CHECKING
export const isStr = (data: any): data is string =>
    typeof (<string>data) === 'string' && (<string>data).trim().length > 0;

//EQUALS
export const userEq = (a: User, b: User) => {
    if (a.id !== b.id || a.login !== b.login || a.avatar !== b.avatar) return false;
    return true;
};

export const voteEq = (a: Vote, b: Vote) => {
    if (a.userID !== b.userID || a.value !== b.value) return false;
    return true;
};

export const votesEq = (_a: Votes, _b: Votes) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (!voteEq(a[i], b[i])) return false;
    }
    return true;
};

export const reviewEq = (a: Review, b: Review) => {
    if (
        a.id !== b.id ||
        !userEq(a.user, b.user) ||
        a.body !== b.body ||
        a.created !== b.created ||
        a.isEdited !== b.isEdited ||
        !votesEq(a.votes, b.votes)
    )
        return false;
    return true;
};

export const reviewsEq = (_a: Reviews, _b: Reviews) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (!reviewEq(a[i], b[i])) return false;
    }
    return true;
};

export const articleEq = (a: Article, b: Article) => {
    if (
        a.id !== b.id ||
        !userEq(a.user, b.user) ||
        a.title !== b.title ||
        a.description !== b.description ||
        a.body !== b.body ||
        !votesEq(a.votes, b.votes) ||
        !reviewsEq(a.reviews, b.reviews) ||
        a.created !== b.created ||
        a.isEdited !== b.isEdited
    )
        return false;
    return true;
};

export const articlesEq = (_a: Articles, _b: Articles) => {
    if (_a === _b) return true;
    if (_a.length !== _b.length) return false;
    const a = [..._a],
        b = [..._b];
    a.sort(), b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (!articleEq(a[i], b[i])) return false;
    }
    return true;
};

export const inputDataEq = (a: InputData, b: InputData) => {
    if (a.body !== b.body || a.description !== b.description || a.title !== b.title) return false;
    return true;
};
