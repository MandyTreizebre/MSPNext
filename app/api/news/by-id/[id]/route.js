import NewsDAL from "@/server/DAL/NewsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {id} = params

    try {
        const information = await NewsDAL.getNewByID(id)
        return NextResponse.json(information, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération de de l'actualité`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}