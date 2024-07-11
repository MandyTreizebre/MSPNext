import PharmaciesOnCallDAL from "@/server/DAL/PharmaciesOnCallDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
      const pharmaciesOnCall = await PharmaciesOnCallDAL.getPharmaciesOnCall()
      return NextResponse.json(pharmaciesOnCall, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des pharmacies de garde', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}