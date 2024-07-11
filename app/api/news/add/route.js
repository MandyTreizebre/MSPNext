import { NextResponse } from 'next/server' 
import NewsDAL from '@/DAL/NewsDAL' 
import { withAuth } from '@/middlewares/withAuth' 
import validator from 'validator' 
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

async function handler(req) {
    if (req.method === 'POST') {
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
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 }) 
    }
}

export const POST = withAuth(handler) 
export const config = {
    api: {
        bodyParser: false
    }
} 
