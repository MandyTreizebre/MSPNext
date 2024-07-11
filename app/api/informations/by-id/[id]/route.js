import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {id} = params

    try {
        const information = await HealthInformationsDAL.getInformationByID(id)
        return NextResponse.json(information, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'information`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}