import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import cookie from 'cookie'
import AdminsDAL from '@/server/DAL/AdminsDAL'

const secret = process.env.JWT_SECRET

export async function POST(req) {
    const { email, password } = await req.json()

    try {
        const admin = await AdminsDAL.getAdminByEmail(email)
        if (admin.length === 0) {
            return NextResponse.json({ msg: "Erreur d'authentification, adresse mail ou mot de passe invalide" }, { status: 400 })
        }

        const isPasswordsEquals = await bcrypt.compare(password, admin[0].password)
        if (!isPasswordsEquals) {
            return NextResponse.json({ msg: "Erreur d'authentification, adresse mail ou mot de passe invalide" }, { status: 400 })
        }

        const payload = { email: email, id: admin[0].id }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })

        const response = NextResponse.json({ msg: "Authentification réussie", admin: admin[0], token }, { status: 200 })
        response.headers.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            sameSite: 'strict',
            path: '/'
        }))
        
        return response
    } catch (error) {
        console.error('Erreur lors de la connexion:', error)
        return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
    }
}
