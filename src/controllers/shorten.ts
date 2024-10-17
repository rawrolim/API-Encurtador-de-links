import { Request, Response } from "express";
import { query } from "../configs/pg";
import { generateToken } from "../configs/functions";
import UserInterface from "../interfaces/user";
import UrlInterface from "../interfaces/urlInterface";

export async function createUrlShorten(req: Request, res: Response) {
    try {
        const body = req.body;
        if (!body.url)
            throw new Error("Need to inform the URL.");

        const rs_url = await query("SELECT * FROM urls WHERE url=$1 AND userId=$2", [body.url, body.user.id]);
        if (rs_url.length > 0)
            throw new Error("This url exist, inform other.");

        await query("INSERT INTO urls(userId,url,shortCode) VALUES($1,$2,$3)", [body.user.id, body.url, generateToken(1)]);

        const rs: UrlInterface[] = await query("SELECT * FROM urls WHERE url=$1 AND userId=$2", [body.url, body.user.id]);
        const url = rs[0];
        await query("INSERT INTO logs(urlId,qtd) VALUES($1,$2)", [url.id, 0]);
        res.status(200).json(rs[0]);
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).json(err.toString());
    }
}

export async function getShortCode(req: Request, res: Response) {
    try {
        if (!req.params.shortCode)
            throw new Error("Need to inform the URL.");

        const user: UserInterface = req.body.user;
        const short = user.urls.find(url => url.shortcode == req.params.shortCode);

        if (!short)
            throw new Error("Short code don't exist.");
        
        res.status(200).json(short);
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).json(err.toString());
    }
}

export async function deleteShortCode(req: Request, res: Response) {
    try {
        if (!req.params.shortCode)
            throw new Error("Need to inform the URL.");

        const user: UserInterface = req.body.user;
        const short = user.urls.find(url => url.shortcode == req.params.shortCode);
        await query("DELETE FROM logs WHERE urlId=$1", [short?.id]);
        await query("DELETE FROM urls WHERE id=$1", [short?.id]);

        res.status(200);
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).json(err.toString());
    }
}

export async function getStatistics(req: Request, res: Response) {
    try {
        if (!req.params.shortCode)
            throw new Error("Need to inform the URL.");
        const user: UserInterface = req.body.user;
        const short = user.urls.find(url => url.shortcode == req.params.shortCode);
        if(short){
            let qtdTotal = 0;
            for(let i=0; i<short.log.length; i++){
                qtdTotal += Number(short.log[i].qtd);
            }
            short.qtd = qtdTotal;
        }
        res.status(200).json(short);
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).json(err.toString());
    }
}