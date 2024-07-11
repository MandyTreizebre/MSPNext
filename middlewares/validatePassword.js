import { NextResponse } from 'next/server'

export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!regex.test(password)) {
        return NextResponse.json({ msg: 'Mot de passe invalide, vous devez avoir au minimum 12 caractères contenant une minuscule, une majuscule, un chiffre, et un caractère spécial' }, { status: 400 });
    }
}
