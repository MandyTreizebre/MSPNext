import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    console.log("appel de la fonction get pour obtenir les infos par catégorie")
    const {category} = params
    console.log("category =>", category)

    try {
        const informationsByCategory = await HealthInformationsDAL.getInformationsByCategory(category)
        console.log("informationsByCategory =>", informationsByCategory)
        return NextResponse.json(informationsByCategory, {status: 200})
    } catch (error) {
        console.error(`Erreur lors de la récupération des informations`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}