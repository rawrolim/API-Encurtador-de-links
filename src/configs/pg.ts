import { Pool } from 'pg';

export async function query(text: string, params:any[]=[]){
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT)
    });
    console.log(`SQL Execution`, text);
    const rs = await pool.query(text, params);
    pool.end();
    return rs.rows;
}