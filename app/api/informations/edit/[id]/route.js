import { NextResponse } from 'next/server'
import HealthInformationsDAL from '@/server/DAL/HealthInformationsDAL'
import { withAuth } from '@/middlewares/withAuth'
import { saveFile } from '@/server/files'

export const PUT = withAuth(async (req, { params }) => {
    const { id } = params

    const formData = await req.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const file = formData.get('image')
    const link = formData.get('link')
    const category = formData.get('category')
    const existingImage = formData.get('existingImage')

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`:-]{1,100}$/.test(title)) {
        console.error('Titre invalide')
        return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })
    }

    if (!/^[\p{L}0-9 .,'’‘`-…]{1,500}$/u.test(description)) {
        console.error('Description invalide')
        return NextResponse.json({ msg: "Description invalide" }, { status: 400 })
    }

    if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(link)) {
        console.error('Lien invalide')
        return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })
    }

    if (!category) {
        console.error('Catégorie invalide')
        return NextResponse.json({ msg: "Catégorie invalide" }, { status: 400 })
    }

    let picturePath = null
    if (file) {
        picturePath = await saveFile(file)
    }

    try {
        const result = await HealthInformationsDAL.updateInformation({
            body: {
                title: title,
                description: description,
                picturePath: picturePath,
                link: link,
                category: category,
                existingImage: existingImage
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

