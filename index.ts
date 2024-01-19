import express, { Request, Response } from 'express';
import mysql, { MysqlError } from "mysql";

const app = express();

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DATABASE || "test",
});

interface Student {
    id: number;
    name: string;
    age: number;
}


app.get("/", (req: Request, res: Response) => {
    connection.query("SELECT * FROM Student", (err: MysqlError, rows : Student[]) => {
        if (err) {
            res.status(500).json({
                success: false,
                err: err.message,
            });
        } else {
            res.json({
                success: true,
                data: rows,
            });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
