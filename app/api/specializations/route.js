import SpecializationsDAL from "@/server/DAL/SpecializationsDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const specializations = await SpecializationsDAL.getSpecializations()
    return NextResponse.json(specializations, { status: 200 })
  } catch (error) {
    console.error('Erreur lors de la récupération des spécialisations:', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
}
