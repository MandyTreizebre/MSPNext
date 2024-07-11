import path from "path"
import fs from "fs"

export const saveFile = async (file) => {
    const data = await file.arrayBuffer()
    const buffer = Buffer.from(data)
    const filePath = path.join(process.cwd(), 'public', 'images', file.name)

    await fs.promises.writeFile(filePath, buffer)
    return `images/${file.name}`
}