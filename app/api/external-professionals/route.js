import { NextResponse } from "next/server"
import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { withAuth } from '@/middlewares/withAuth'

export async function GET(req) {
    try {
      const externalProfessionals = await ExternalProfessionalsDAL.getExternalPros()
      return NextResponse.json(externalProfessionals, { status: 200 })
    } catch (error) {
      console.error('Erreur lors de la récupération des professionnels externes:', error)
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export const POST = withAuth(async(req) => {

  const formData = await req.formData()
  const name = formData.get('name')
  const link = formData.get('link')
  const pictureUrl = formData.get('pictureUrl')

  const validatedName = name?.trim() ?? "" 
  const validatedLink = link?.trim() ?? "" 

  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/u.test(validatedName)) {
    console.error('Nom invalide')
    return NextResponse.json({ msg: "Nom invalide" }, { status: 400 })
  }

  if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(validatedLink)) {
    console.error('Lien invalide')
    return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
  }

  try {
    const result = await ExternalProfessionalsDAL.addExternalPro({
      body: {
        name: validatedName,
        link: validatedLink,
        pictureUrl: pictureUrl
      }
    })

    if (result.affectedRows === 0) {
      return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
    }

    return NextResponse.json({ result }, { status: 201 })
  } catch (error) {
    console.error(`Erreur lors de l'ajout du professionnel externe: ${error}`)
    return NextResponse.json({ message: 'Erreur interne du serveur', error }, { status: 500 })
  }
})

