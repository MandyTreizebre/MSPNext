import ProfessionalsDAL from "@/server/DAL/ProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {

    try {
        const professionalsAndHours = await ProfessionalsDAL.getProfessionalsAndHours()
        return NextResponse.json(professionalsAndHours, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération des professionnels`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}