import ProfessionalsDAL from "@/DAL/ProfessionalsDAL"
import { withAuth } from '@/middlewares/withAuth'
import { NextResponse } from 'next/server'

async function handler(req, { params }) {
    const { id } = params

    try {
        const professionalStatus = await ProfessionalsDAL.ChangeProfessionalStatus(id)
        return NextResponse.json(professionalStatus, { status: 200 })
    } catch (error) {
        console.error(`Erreur lors de la désactivation du professionnel`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export const PUT = withAuth(handler)
