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

export type NewAccount = Omit<Account, "created_at">;
export type NewMessage = Omit<Message, "id"|"created_at">;
export type NewRequest = Omit<Request, "created_at"|"status">;