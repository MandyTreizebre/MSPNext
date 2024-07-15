import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {id} = params

    try {
        const externalProfessional = await ExternalProfessionalsDAL.getExternalProByID(id)
        return NextResponse.json(externalProfessional, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération du professionnel`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}