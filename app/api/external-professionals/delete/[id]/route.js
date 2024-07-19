import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { NextResponse } from "next/server"
import { withAuth } from '@/middlewares/withAuth'

export const DELETE = withAuth(async (req, { params }) => {
    const { id } = params 
  
    try {

        const externalProPicture = await ExternalProfessionalsDAL.getExternalProPicture(id)
        if (!externalProPicture) {
            return NextResponse.json({ message: 'Image non trouvée' }, { status: 404 })
        }

        if (externalProPicture) {
            await deleteBlob(externalProPicture)
        }

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