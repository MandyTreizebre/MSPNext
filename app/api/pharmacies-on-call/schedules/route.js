import PharmaciesOnCallDAL from "@/DAL/PharmaciesOnCallDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
      const onCallPharmacies = await PharmaciesOnCallDAL.getPharmaciesOnCallAndSchedules()
      return NextResponse.json(onCallPharmacies, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des pharmacies de garde:', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}