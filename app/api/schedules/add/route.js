import SchedulesDAL from '@/DAL/SchedulesDAL'
import { NextResponse } from 'next/server'
import { withAuth } from '@/middlewares/withAuth'

async function handler(req) {
    const { pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon } = await req.json()

    const parsedProId = parseInt(pro_id, 10)
    const parsedDayId = parseInt(day_id, 10)
    const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/

    if (!pro_id || isNaN(parsedProId) || parsedProId <= 0) {
        return NextResponse.json({ msg: "Professionnel invalide" }, { status: 400 })
    }

    if (!day_id || isNaN(parsedDayId) || parsedDayId <= 0) {
        return NextResponse.json({ msg: "Jour invalide" }, { status: 400 })
    }

    if (!h_start_morning || !timePattern.test(h_start_morning)) {
        return NextResponse.json({ msg: "Heure de début du matin invalide" }, { status: 400 })
    }

    if (!h_end_morning || !timePattern.test(h_end_morning)) {
        return NextResponse.json({ msg: "Heure de fin du matin invalide" }, { status: 400 })
    }

    if (!h_start_afternoon || !timePattern.test(h_start_afternoon)) {
        return NextResponse.json({ msg: "Heure de début de l'après-midi invalide" }, { status: 400 })
    }

    if (!h_end_afternoon || !timePattern.test(h_end_afternoon)) {
        return NextResponse.json({ msg: "Heure de fin de l'après-midi invalide" }, { status: 400 })
    }

    try {
        const existingHours = await SchedulesDAL.getSchedulesByProAndDay(parsedProId, parsedDayId)

        if (existingHours.length > 0) {
            return NextResponse.json({ msg: "Des horaires existent déjà pour ce jour et ce professionnel." }, { status: 400 })
        }

        const data = { pro_id: parsedProId, day_id: parsedDayId, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon }
        const savedSchedules = await SchedulesDAL.addSchedules(data)

        return NextResponse.json({ result: savedSchedules }, { status: 201 })
    } catch (error) {
        console.error('Erreur lors de l\'ajout des horaires:', error)
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export const POST = withAuth(handler)
