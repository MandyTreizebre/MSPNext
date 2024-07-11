import HealthInformationsDAL from "@/DAL/HealthInformationsDAL"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
      const informations = await HealthInformationsDAL.getInformations()
      return NextResponse.json(informations, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des informations', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}