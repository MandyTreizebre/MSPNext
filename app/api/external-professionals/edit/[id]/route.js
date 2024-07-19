import { NextResponse } from "next/server"
import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { withAuth } from '@/middlewares/withAuth'


export const PUT = withAuth(async (req, { params }) => {
    const { id } = params
  
    try {
        const formData = await req.formData()
        const name = formData.get('name')
        const link = formData.get('link')
        const pictureUrl = formData.get('pictureUrl')
        const existingPictureUrl = formData.get('existingPictureUrl')
  
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
  
        const result = await ExternalProfessionalsDAL.updateExternalPro({
            body: {
                name: validatedName,
                link: validatedLink,
                pictureUrl: pictureUrl || existingPictureUrl
            }
        }, id) 
  
        if (result.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 }) 
        }
  
        return NextResponse.json({ result }, { status: 200 }) 
    } catch (error) {
        console.error(`Erreur lors de la modification du professionnel externe: ${error}`) 
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
    }
  })