import { NextResponse } from "next/server"
import ExternalProfessionalsDAL from "@/DAL/ExternalProfessionalsDAL"

export async function GET(req) {
    try {
      const externalProfessionals = await ExternalProfessionalsDAL.getExternalPros()
      return NextResponse.json(externalProfessionals, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des professionnels externes:', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
  }