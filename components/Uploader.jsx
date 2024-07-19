'use client'
import { useState, useRef } from 'react' 

export default function UploadFiles({ onUpload }) {
    const inputFileRef = useRef(null) 
    const [uploadMessage, setUploadMessage] = useState(null)

    const handleFileUpload = async (event) => {
        const file = event.target.files[0] 
        const filename = file.name 
        const formData = new FormData() 
        formData.append('file', file) 

        try {
            const response = await fetch(`/api/upload?filename=${filename}`, {
                method: 'POST',
                body: formData,
            }) 

            console.log("file.type:", file.type)
            console.log("FormData:", formData.get('file'))

            const newBlob = await response.json() 
            onUpload(newBlob.url) 
            setUploadMessage("success")
        } catch (error) {
            console.error('Erreur lors de l\'upload du fichier:', error)
            setUploadMessage('error')
        }
    } 

    return (
        <div>
           <input
            type="file"
            ref={inputFileRef}
            onChange={handleFileUpload}
            accept="image/*"
            required
            />
            {uploadMessage === 'success' && <p>Image téléchargée.</p>}
            {uploadMessage === 'error' && <p>Erreur lors du téléchargement de l'image</p>} 
        </div>
    )
}
