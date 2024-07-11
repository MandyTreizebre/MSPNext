import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL" 
import { withAuth } from "@/middlewares/withAuth"
import { NextResponse } from 'next/server' 

export const DELETE = withAuth(async (req, { params }) => {
    const { id } = params 

    try {
        const deletedExternalProfessional = await ExternalProfessionalsDAL.deleteExternalPro(id) 
        if (deletedExternalProfessional.affectedRows === 0) {
            return NextResponse.json({ message: 'Professionnel non trouvé' }, { status: 404 }) 
        }
        return NextResponse.json({ message: 'Professionnel supprimé avec succès' }, { status: 200 }) 
    } catch (error) {
        console.error('Erreur lors de la suppression du professionnel:', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
})