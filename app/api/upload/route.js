import { put } from "@vercel/blob"
import { NextResponse } from 'next/server'


export async function POST(req) {
    try {

      const formData = await req.formData() 
      const file = formData.get('file') 

      if (!file) {
        throw new Error('No file uploaded') 
    }
    
      const contentType = file.type || 'text/plain'
      if (!contentType.startsWith('image/')) {
        throw new Error('Invalid file type')
    }

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${contentType.split('/')[1]}`

      const blob = await put(filename, Buffer.from(buffer), {
          contentType,
          access: 'public'
      })

      return NextResponse.json(blob, { status: 200 })
    } catch (error) {
      console.error('Upload error:', error) 
      return NextResponse.json({ message: 'Erreur lors de l\'upload du fichier' }, { status: 500 })
    }
}

