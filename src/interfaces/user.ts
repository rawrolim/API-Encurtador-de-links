import urlInterface from "./urlInterface";

export default interface UserInterface{
    id: number;
    email: string;
    token: string;
    createdAt: Date;
    urls: urlInterface[];
}