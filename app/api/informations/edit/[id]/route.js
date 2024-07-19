import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from "next/server"
import { withAuth } from '@/middlewares/withAuth'

export const PUT = withAuth(async (req, { params }) => {
    const { id } = params
  
    const formData = await req.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const pictureUrl = formData.get('pictureUrl')
    const existingPictureUrl = formData.get('existingPictureUrl')
    const link = formData.get('link')
    const category = formData.get('category')
  
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`:-]{1,100}$/.test(title)) {
        console.error('Titre invalide')
        return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
    }
  
    if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(link)) {
        console.error('Lien invalide')
        return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
    }
  
    if (!category) {
        console.error('Catégorie invalide')
        return NextResponse.json({ msg: "Catégorie invalide" }, { status: 400 })
    }
  
    try {
        const result = await HealthInformationsDAL.updateInformation({
            body: {
                title: title,
                description: description,
                pictureUrl: pictureUrl || existingPictureUrl,
                link: link,
                category: category,
            }
        }, id)
  
        if (result.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
        }
  
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error(`Erreur lors de la modification de l'information santé: ${error}`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
  })
  