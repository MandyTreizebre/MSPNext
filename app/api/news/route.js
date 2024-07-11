import { NextResponse } from "next/server"
import NewsDAL from "@/DAL/NewsDAL"

export async function GET(req) {
    try {
        const news = await NewsDAL.getNews()
        return NextResponse.json(news, {status: 200})
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités', error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}