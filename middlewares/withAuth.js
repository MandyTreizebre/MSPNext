import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET;

export async function withAuth(req) {
    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
        return NextResponse.json({ msg: "Token introuvable, veuillez vous connecter" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
    } catch (err) {
        return NextResponse.json({ msg: "Token invalide ou expiré" }, { status: 401 });
    }
}
