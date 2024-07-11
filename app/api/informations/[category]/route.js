import HealthInformationsDAL from "@/DAL/HealthInformationsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    const {category} = params

    try {
        const informationsByCategory = await HealthInformationsDAL.getInformationsByCategory(category)
        return NextResponse.json(informationsByCategory, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération des informations`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}