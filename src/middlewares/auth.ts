import { NextFunction, Request, Response } from "express";
import { query } from "../configs/pg";
import UserInterface from "../interfaces/user";
import UrlInterface from "../interfaces/urlInterface";

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const rs_user: UserInterface[] = await query('SELECT * FROM users WHERE token=$1',[req.headers.token]);
    if(rs_user.length == 0)
        res.status(401).json('Unauthorized');

    const user = rs_user[0];

    const rs_urls: UrlInterface[] = await query("SELECT * FROM urls WHERE userId=$1",[user.id]);

    for(let i=0; i<rs_urls.length; i++){
        const rs_log = await query("SELECT * FROM logs WHERE urlId=$1",[rs_urls[i].id]);
        rs_urls[i].log = [...rs_log];
    }

    user.urls = [...rs_urls];
    req.body.user = user;
    next();
}

