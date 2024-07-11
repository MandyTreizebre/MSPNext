import ProfessionalsDAL from "@/DAL/ProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {speciality_id} = params

    try {
        const professional = await ProfessionalsDAL.getProBySpe(speciality_id)
        return NextResponse.json(professional, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération des professionnels`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}