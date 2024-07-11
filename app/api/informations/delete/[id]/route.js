import HealthInformationsDAL from "@/DAL/HealthInformationsDAL"
import { NextResponse } from 'next/server' 

export async function DELETE(req, { params }) {
    const { id } = params 

    try {
        const deletedInformations = await HealthInformationsDAL.deleteInformation(id) 
        if (deletedInformations.affectedRows === 0) {
            return NextResponse.json({ message: 'Information non trouvée' }, { status: 404 }) 
        }
        return NextResponse.json({ message: 'Information supprimée avec succès' }, { status: 200 }) 
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'information', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
}