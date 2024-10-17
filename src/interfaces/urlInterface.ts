import logInterface from "./logInterface";

export default interface UrlInterface{
    id: number;
    userid: number;
    shortcode: string;
    url: string;
    createdat: Date;
    updatedat: Date;
    qtd: number;
    log: logInterface[]
}