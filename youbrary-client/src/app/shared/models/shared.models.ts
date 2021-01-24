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