import { NextResponse } from "next/server"
import ExternalProfessionalsDAL from "@/server/DAL/ExternalProfessionalsDAL"
import { withAuth } from '@/middlewares/withAuth'
import { saveFile } from '@/server/files'
import fs from 'fs'
import path from 'path' 
import os from 'os' 

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
  const file = formData.get('picture')

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
})

async function parseMultipartForm(req) {
  const chunks = [] 
  for await (const chunk of req.body) {
      chunks.push(chunk) 
  }
  const boundary = req.headers.get('content-type').split('=')[1] 
  const buffer = Buffer.concat(chunks) 
  const parts = buffer.toString().split(`--${boundary}`) 

  const fields = {} 
  let file = null 

  for (const part of parts) {
      if (part.indexOf('Content-Disposition') === -1) continue 
      const [header, body] = part.split('\r\n\r\n') 
      if (header.includes('filename')) {
          const fileName = header.match(/filename="(.+?)"/)[1] 
          const contentType = header.match(/Content-Type: (.+?)\r\n/)[1] 
          const filePath = path.join(os.tmpdir(), fileName) 
          fs.writeFileSync(filePath, body.trim()) 
          file = {
              path: filePath,
              name: fileName,
              type: contentType,
          } 
      } else {
          const name = header.match(/name="(.+?)"/)[1] 
          fields[name] = body.trim() 
      }
  }
  return { fields, file } 
}

export const PUT = withAuth(async (req, { params }) => {
  const { id } = params

  try {
      const formData = await req.formData()
      const name = formData.get('name')
      const link = formData.get('link')
      const file = formData.get('picture')

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

      let picturePath = null
      if (file) {
        picturePath = await saveFile(file)
      }

      const result = await ExternalProfessionalsDAL.updateExternalPro({
          body: {
              name: validatedName,
              link: validatedLink,
              picture: picturePath
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

export const DELETE = withAuth(async (req, { params }) => {
  const { id } = params 

  try {
      const deletedExternalProfessional = await ExternalProfessionalsDAL.deleteExternalPro(id) 
      if (deletedExternalProfessional.affectedRows === 0) {
          return NextResponse.json({ message: 'Professionnel non trouvé' }, { status: 404 }) 
      }
      return NextResponse.json({ message: 'Professionnel supprimé avec succès' }, { status: 200 }) 
  } catch (error) {
      console.error('Erreur lors de la suppression du professionnel:', error) 
      return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 }) 
  }
})