import { NextResponse } from "next/server"
import NewsDAL from "@/server/DAL/NewsDAL"
import { withAuth } from '@/middlewares/withAuth'

export const PUT = withAuth(async (req, { params }) => {
    const { id } = params

    const formData = await req.formData()
    const title = formData.get('title')
    const details = formData.get('details')
    const externalLink = formData.get('external_link')
    const pictureUrl = formData.get('pictureUrl')
    const existingPictureUrl = formData.get('existingPictureUrl')

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/.test(title)) {
        console.error('Titre invalide')
        return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
    }

    if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(externalLink)) {
        console.error('Lien invalide')
        return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
    }

    try {
        const result = await NewsDAL.updateNew({
            body: {
                title: title,
                details: details,
                pictureUrl: pictureUrl || existingPictureUrl,
                externalLink: externalLink,
            }
        }, id)

        if (result.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
        }

        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error(`Erreur lors de la modification de l'actualité ${error}`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
})