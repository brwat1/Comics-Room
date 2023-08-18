import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = req.headers && req.headers['authorization'] as string;

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1];
            (req as any).token = jwt.verify(token, process.env.SECRET!);
            next();
        } else {
            res.redirect('/login');
            //res.status(401).end();
        }
    } catch {
        res.redirect('/login');
    }
}