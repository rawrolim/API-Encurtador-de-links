import { Request, Response } from "express";
import { query } from "../configs/pg";
import { generateToken } from "../configs/functions";
import UserInterface from "../interfaces/user";

export async function createUser(req:Request, res: Response){
    try{
        const body:UserInterface = req.body;

        if(!body.email)
            throw new Error("Inform the email");

        const rs_users = await query("SELECT * FROM users WHERE email=$1",[body.email]);

        if(rs_users.length == 1)
            throw new Error("User exist");

        let sql = `INSERT INTO users(email,token) VALUES($1,$2)`;
        let values = [body.email, generateToken(2)];
        await query(sql,values);

        const rs_user = await query('SELECT * FROM users WHERE email=$1',[body.email]);
        res.status(200).json(rs_user[0]);
    }catch(err: any){
        console.log(err.toString());
        res.status(400).json(err.toString());
    }
}
