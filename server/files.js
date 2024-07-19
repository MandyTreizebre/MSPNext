import { del } from '@vercel/blob'

export function deleteFile(url) {
    console.log(url)
    return del(url)
}

//Legacy Disk Save File
/*export const saveFile = async (file) => {
    const data = await file.arrayBuffer()
    const buffer = Buffer.from(data)
    const filePath = path.join(process.cwd(), 'public', 'images', file.name)

    await fs.promises.writeFile(filePath, buffer)
    return `images/${file.name}`
}*/