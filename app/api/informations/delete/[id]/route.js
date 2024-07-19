import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from "next/server"
import { withAuth } from '@/middlewares/withAuth'
import { deleteFile } from "@/server/files"

export const DELETE = withAuth(async (req, { params }) => {
    const { id } = params 
  
    try {

        const [information] = await HealthInformationsDAL.getInformationByID(id)

        if (!information) {
            return NextResponse.json({ message: 'Information non trouvée' }, { status: 404 })
        }

        const deletedInformations = await HealthInformationsDAL.deleteInformation(id) 
        if (deletedInformations.affectedRows === 0) {
            return NextResponse.json({ message: 'Information non trouvée' }, { status: 404 }) 
        }

        await deleteFile(information.picture)

        return NextResponse.json({ message: 'Information supprimée avec succès' }, { status: 200 }) 
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'information', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
  })

