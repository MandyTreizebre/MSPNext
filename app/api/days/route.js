import SchedulesDAL from '@/DAL/SchedulesDAL'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const days = await SchedulesDAL.getDays()
    return NextResponse.json(days, { status: 200 })
  } catch (error) {
    console.error('Erreur lors de la récupération des jours', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
}
