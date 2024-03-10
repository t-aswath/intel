import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access_token'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        req.body.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

export default verifyToken
