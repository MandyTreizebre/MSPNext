import ProfessionalsDAL from "@/server/DAL/ProfessionalsDAL"
import { withAuth } from '@/middlewares/withAuth'
import { NextResponse } from 'next/server'

export const PUT = withAuth(async (req, { params }) => {
    const { id } = params

    try {
        const professionalStatus = await ProfessionalsDAL.ChangeProfessionalStatus(id)
        return NextResponse.json(professionalStatus, { status: 200 })
    } catch (error) {
        console.error(`Erreur lors de la désactivation du professionnel`, error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
})
