import AdminsDAL from "@/server/DAL/AdminsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {id} = params

    try {
        const admin = await AdminsDAL.getAdminByID(id)
        return NextResponse.json(admin, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération de de l'admin`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}