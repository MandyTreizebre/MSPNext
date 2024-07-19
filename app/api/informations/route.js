import HealthInformationsDAL from "@/server/DAL/HealthInformationsDAL"
import { NextResponse } from "next/server"
import { withAuth } from '@/middlewares/withAuth'

export async function GET(req) {
    try {
      const informations = await HealthInformationsDAL.getInformations()
      return NextResponse.json(informations, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des informations', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export const POST = withAuth(async(req) => {

  const formData = await req.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const link = formData.get('link')
  const pictureUrl = formData.get('pictureUrl')
  const category = formData.get('category')

  const validatedTitle = title?.trim() ?? "" 
  const validatedDescription = description?.trim() ?? ""
  const validatedLink = link?.trim() ?? ""
  const validatedCategory = parseInt(category, 10)
  
  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,100}$/u.test(validatedTitle)) {
    console.error('Titre invalide')
    return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
  }

  if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(validatedLink)) {
    console.error('Lien invalide')
    return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
  }

  if (isNaN(validatedCategory)) {
    console.error('Catégorie invalide');
    return NextResponse.json({ msg: "Catégorie invalide" }, { status: 400 });
}

  try {
    const result = await HealthInformationsDAL.addInformation({
      body: {
        title: validatedTitle,
        description: validatedDescription,
        link: validatedLink,
        pictureUrl: pictureUrl,
        category: validatedCategory
      }
    })

    if (result.affectedRows === 0) {
      return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
    }

    return NextResponse.json({ result }, { status: 201 })
    
  } catch (error) {
      console.error(`Erreur lors de l'ajout de l'information: ${error}`)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
})


