import ProfessionalsDAL from '@/server/DAL/ProfessionalsDAL'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const professionals = await ProfessionalsDAL.getProfessionals()
    return NextResponse.json(professionals, { status: 200 })
  } catch (error) {
    console.error('Erreur lors de la récupération des professionnels:', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
}
