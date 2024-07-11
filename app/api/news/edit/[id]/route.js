import { NextResponse } from 'next/server'  
import NewsDAL from '@/DAL/NewsDAL'  
import { withAuth } from '@/middlewares/withAuth'  
import fs from 'fs'  
import path from 'path'  

// Fonction pour sauvegarder les fichiers
const saveFile = async (file) => {
    const data = await file.arrayBuffer()  
    const buffer = Buffer.from(data)  
    const filePath = path.join(process.cwd(), 'public', 'images', file.name)  

    await fs.promises.writeFile(filePath, buffer)  
    return `images/${file.name}`  
}  

async function handler(req, { params }) {
    const { id } = params  

    if (req.method === 'PUT') {
        const formData = await req.formData()  
        const title = formData.get('title')  
        const details = formData.get('details')  
        const externalLink = formData.get('external_link')  
        const file = formData.get('picture')  
        const existingImage = formData.get('existingImage')  

        if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/.test(title)) {
            console.error('Titre invalide')  
            return NextResponse.json({ msg: "Titre invalide" }, { status: 400 })  
        }

        /*if (!/^[\p{L}0-9 .,'’‘%()\-]{1,500}$/u.test(details)) {
            console.error('Détails invalide')  
            return NextResponse.json({ msg: "Détails invalide" }, { status: 400 })  
        }*/
       
        if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(externalLink)) {
            console.error('Lien invalide')  
            return NextResponse.json({ msg: "Lien invalide" }, { status: 400 })  
        }

        let picturePath = null  
        if (file) {
            picturePath = await saveFile(file)  
        }

        try {
            const result = await NewsDAL.updateNew({
                body: {
                    title: title,
                    details: details,
                    picturePath: picturePath,
                    externalLink: externalLink,
                    existingImage: existingImage
                }
            }, id)  

            if (result.affectedRows === 0) {
                return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 })  
            }

            console.log('Information modifiée:', result) 
            return NextResponse.json({ result }, { status: 200 })  
        } catch (error) {
            console.error(`Erreur lors de la modification de l'actualité ${error}`)  
            return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })  
        }
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 })  
    }
}

export const PUT = withAuth(handler)  
const config = {
    api: {
      bodyParser: false,
      responseLimit: '1mb'
    }
}