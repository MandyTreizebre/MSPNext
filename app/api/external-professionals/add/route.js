import { NextResponse } from 'next/server' 
import ExternalProfessionalsDAL from '@/DAL/ExternalProfessionalsDAL' 
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
        const name = formData.get('name') 
        const link = formData.get('link') 
        const file = formData.get('picture') 

        const validatedName = name ? validator.trim(name) : '' 
        const validatedLink = link ? validator.trim(link) : '' 

        if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/u.test(validatedName)) {
            console.error('Nom invalide') 
            return NextResponse.json({ msg: "Nom invalide" }, { status: 400 }) 
        }

        if (!/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._-]*)*\/?$/.test(validatedLink)) {
            console.error('Lien invalide') 
            return NextResponse.json({ msg: "Lien invalide" }, { status: 400 }) 
        }

        let picturePath = null 
        if (file) {
            picturePath = await saveFile(file) 
        }

        try {
            const result = await ExternalProfessionalsDAL.addExternalPro({
                body: {
                    name: validatedName,
                    link: validatedLink,
                    picture: picturePath
                }
            }) 

            if (result.affectedRows === 0) {
                return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 }) 
            }

            return NextResponse.json({ result }, { status: 201 }) 
        } catch (error) {
            console.error(`Erreur lors de l'ajout du professionnel externe: ${error}`) 
            return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
        }
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 }) 
    }
}

export const POST = withAuth(handler) 
const config = {
    api: {
      bodyParser: false,
      responseLimit: '1mb'
    }
}
