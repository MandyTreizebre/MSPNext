import ProfessionalsDAL from "@/server/DAL/ProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {id} = params

    try {
        const professional = await ProfessionalsDAL.getProByID(id)
        return NextResponse.json(professional, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération du professionnel`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}