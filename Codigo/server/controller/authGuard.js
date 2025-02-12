import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export async function checkPermission(req, res, next) {
    try {
        if (process.env.ENVIRONMENT === "dev") {
            return next();
        }
        const token = req.headers.authorization?.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        if (!user) {
            return res.sendStatus(401);
        }

        req.user = user
        return next();
    } catch {
        return res.sendStatus(401);
    }
}