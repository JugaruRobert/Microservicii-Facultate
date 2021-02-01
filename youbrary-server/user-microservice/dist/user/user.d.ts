import { Document } from 'mongoose';
export declare class User extends Document {
    id: string;
    email: string;
    password: string;
}
