import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET;

export function withAuth(handler) {
    return (req, ...params) => {
        const token = req.cookies.get("token");
        console.log(token)

        if (!token) {
            return NextResponse.json({ msg: "Token introuvable, veuillez vous connecter" }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token.value, secret);
            req.user = decoded;
        } catch (err) {
            return NextResponse.json({ msg: "Token invalide ou expiré" }, { status: 401 });
        }
        return handler(req, ...params)
    }
}
