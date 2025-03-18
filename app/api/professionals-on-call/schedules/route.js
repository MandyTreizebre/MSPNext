import OnCallProfessionalsDAL from "@/server/DAL/OnCallProfessionalsDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
      const onCallSchedulesProfessionals = await OnCallProfessionalsDAL.GetSchedulesOnCall()
      return NextResponse.json(onCallSchedulesProfessionals, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires de garde:', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
  }
  