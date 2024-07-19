import { NextResponse } from "next/server"
import NewsDAL from "@/server/DAL/NewsDAL"
import { withAuth } from '@/middlewares/withAuth'
import { deleteFile } from "@/server/files"

export const DELETE = withAuth(async (req, { params }) => {
    const { id } = params 

    try {
        const [news] = await NewsDAL.getNewByID(id)

        if (!news) {
            return NextResponse.json({ message: 'Actualité non trouvée' }, { status: 404 })
        }

        const deletedNews = await NewsDAL.deleteNew(id) 
        if (deletedNews.affectedRows === 0) {
            return NextResponse.json({ message: 'Actualité non trouvée' }, { status: 404 }) 
        }

        await deleteFile(news.picture)

        return NextResponse.json({ message: 'Actualité supprimée avec succès' }, { status: 200 }) 
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'actualité', error) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
})