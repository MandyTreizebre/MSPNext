import ProfessionalsDAL from "@/server/DAL/ProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {speciality_id} = params

    try {
        const professional = await ProfessionalsDAL.getProBySpe(speciality_id)
        console.log(professional)
        return NextResponse.json(professional, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération du professionnel`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}