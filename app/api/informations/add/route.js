import { NextResponse } from 'next/server';
import AdminsDAL from '@/DAL/AdminsDAL';
import { withAuth } from '@/middlewares/withAuth';
import { validatePassword } from '@/middlewares/validatePassword';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const firstnameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]+$/;

async function handler(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }

    const body = await req.json();

    const passwordValidationResult = validatePassword(body.password);
    if (passwordValidationResult) {
        return passwordValidationResult;
    }

    if (body.email === "") {
        return NextResponse.json({ msg: "Entrez un email" }, { status: 400 });
    }

    if (!emailRegex.test(body.email)) {
        return NextResponse.json({ msg: "Adresse email invalide" }, { status: 400 });
    }

    if (body.firstname === "") {
        return NextResponse.json({ msg: "Entrez un prénom" }, { status: 400 });
    }

    if (!firstnameRegex.test(body.firstname)) {
        return NextResponse.json({ msg: "Prénom invalide" }, { status: 400 });
    }

    try {
        const admins = await AdminsDAL.getAdminByEmail(body.email);

        if (admins.length > 0 && admins[0].email === body.email) {
            return NextResponse.json({ msg: "Email déjà utilisé." }, { status: 400 });
        }

        const admin = await AdminsDAL.saveAdmin({ body });

        return NextResponse.json({ msg: "Administrateur créé" }, { status: 201 });
    } catch (err) {
        console.error('Erreur interne du serveur:', err);
        return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 });
    }
}

export async function POST(req) {
    const authResult = await withAuth(req);
    if (authResult) {
        return authResult;
    }
    return handler(req);
}
