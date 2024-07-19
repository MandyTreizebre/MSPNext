import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { NextResponse } from "next/server"
import { withAuth } from '@/middlewares/withAuth'
import { deleteFile } from "@/server/files"

export const DELETE = withAuth(async (req, { params }) => {
    const { id } = params 
  
    try {

        const [externalPro] = await ExternalProfessionalsDAL.getExternalProByID(id)

        console.log("externalPro:" , externalPro)
        
        if (!externalPro) {
            return NextResponse.json({ message: 'Pro non trouvé' }, { status: 404 })
        }

        const deletedExternalProfessional = await ExternalProfessionalsDAL.deleteExternalPro(id) 
        if (deletedExternalProfessional.affectedRows === 0) {
            return NextResponse.json({ message: 'Professionnel non trouvé' }, { status: 404 })
        }

        await deleteFile(externalPro.picture)

        return NextResponse.json({ message: 'Professionnel supprimé avec succès' }, { status: 200 })
    } catch (error) {
        console.error('Erreur lors de la suppression du professionnel:', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
  })