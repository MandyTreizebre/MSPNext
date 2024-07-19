import { NextResponse } from "next/server"
import NewsDAL from "@/server/DAL/NewsDAL"
import { withAuth } from '@/middlewares/withAuth'

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
    console.log("POST request received")
    const formData = await req.formData()
    const title = formData.get('title')
    const details = formData.get('details')
    const pictureUrl = formData.get('pictureUrl')
    const externalLink = formData.get('external_link') 

    console.log("Form data:", { title, details, pictureUrl, externalLink })

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/.test(title)) {
        console.error('Titre invalide')
        return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
    }

    if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(externalLink)) {
        console.error('Lien invalide')
        return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
    }

    try {
        console.log('Data to pass to addNew:', {
            body: {
                title: title,
                details: details,
                pictureUrl: pictureUrl, 
                externalLink: externalLink, 
            }
        });

        const result = await NewsDAL.addNew({
            body: {
                title: title,
                details: details,
                pictureUrl: pictureUrl,
                externalLink: externalLink, 
            }
        })

        console.log('API Result:', result)

        if (result.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })
        }

        return NextResponse.json({ result }, { status: 201 })
    } catch (error) {
        console.error(`Erreur lors de l'ajout de l'actualité ${error}`)
        return NextResponse.json({ message: 'Erreur interne du serveur', error }, { status: 500 })
    }
})
