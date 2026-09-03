export interface Message {
    id?:string;
    created_at?:string;
    from: string;
    to: string;
    message: string;
    img_url?:string;
}

export interface Account {
    email:string;
    username:string;
    created_at?: string;
    password:string;
}

export interface Request {
    id?:string;
    created_at:string;
    sender:string;
    receiver:string;
    status:string;
}

export interface User {
    id?:string;
    user_id:string;
    pair_id?:string;
    username:string;
    pair_code?:string;
}

export type NewAccount = Omit<Account, "created_at">;
export type NewMessage = Omit<Message, "id"|"created_at">;
export type NewRequest = Omit<Request, "created_at"|"status">;
export type NewUser = Omit<User, 'id'>