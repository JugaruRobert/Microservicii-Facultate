export interface LoginInfo {
    email: string;
    password: string;
}

export interface LoggedInUser {
    token: string;
    email: string;
}

export interface AccessToken {
    access_token: string;
}

export interface ErrorResponse {
    response: string;
    status: number;
    message: string;
}

export interface Book {
    id: string;
    userEmail: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    publisher: string;
    numberOfPages: number;
    coverImage: string;
}