import { NextResponse } from "next/server"
import NewsDAL from "@/server/DAL/NewsDAL"
import { withAuth } from '@/middlewares/withAuth'
import { saveFile } from '@/server/files'

export async function GET(req) {
    try {
        const news = await NewsDAL.getNews()
        return NextResponse.json(news, {status: 200})
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités', error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export const POST = withAuth(async (req) => {
    const formData = await req.formData()
    const title = formData.get('title')
    const details = formData.get('details')
    const file = formData.get('picture')
    const externalLink = formData.get('external_link')  // Fix variable name

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/.test(title)) {
        console.error('Titre invalide')
        return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
    }

    if (!/^[\p{L}0-9 .,'-]{1,200}$/u.test(details)) {
        console.error('Détails invalide')
        return NextResponse.json({ msg: "Détails invalide" }, { status: 400 })
    }

    if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(externalLink)) { // Fix variable name
        console.error('Lien invalide')
        return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
    }

    if (!file) {
        console.error('Image manquante')
        return NextResponse.json({ msg: "Image manquante" }, { status: 400 })
    }

    let picturePath = await saveFile(file)

    try {
        const result = await NewsDAL.addNew({
            body: {
                title: title,
                details: details,
                picturePath: picturePath,
                externalLink: externalLink, // Fix variable name
            }
        })

        if (result.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
        }

        return NextResponse.json({ result }, { status: 201 })
    } catch (error) {
        console.error(`Erreur lors de l'ajout de l'actualité ${error}`)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
})
