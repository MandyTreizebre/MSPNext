import NewsDAL from "@/DAL/NewsDAL"
import { NextResponse } from 'next/server' 

export async function DELETE(req, { params }) {
    const { id } = params 

    try {
        const deletedNews = await NewsDAL.deleteNew(id) 
        if (deletedNews.affectedRows === 0) {
            return NextResponse.json({ message: 'Actualité non trouvée' }, { status: 404 }) 
        }
        return NextResponse.json({ message: 'Actualité supprimée avec succès' }, { status: 200 }) 
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'actualité', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
}