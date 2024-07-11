import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
      const categories = await HealthInformationsDAL.getCategories()
      return NextResponse.json(categories, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
  }