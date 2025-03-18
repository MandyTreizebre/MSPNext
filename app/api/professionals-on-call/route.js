import OnCallProfessionalsDAL from "@/server/DAL/OnCallProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const onCallProfessionals = await OnCallProfessionalsDAL.GetProsOnCall()
    return NextResponse.json(onCallProfessionals, { status: 200 })
  } catch (error) {
    console.error('Erreur lors de la récupération des Professionnels de garde:', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
}





  