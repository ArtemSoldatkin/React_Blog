import * as _t from './index';

//TYPES
export interface User {
    login: string;
    password: string;
    avatar: string;
}
export interface ResponseUser {
    id: string;
    login: string;
    avatar: string;
}
export interface AddUser {
    login: string;
    password: string;
    avatar?: string;
}
export interface EditUser {
    avatar: string;
}
export interface Login {
    login: string;
    password: string;
}

//TYPE CHECKING
export const isAddUser = (data: any): data is AddUser =>
    <AddUser>data instanceof Object &&
    _t.isString((<AddUser>data).login) &&
    _t.isString((<AddUser>data).password) &&
    _t.isOptionalString((<AddUser>data).avatar);
export const isEditUser = (data: any): data is EditUser =>
    <EditUser>data instanceof Object && _t.isString((<EditUser>data).avatar);
export const isLogin = (data: any): data is Login =>
    <Login>data instanceof Object &&
    _t.isString((<Login>data).login) &&
    _t.isString((<Login>data).password);
