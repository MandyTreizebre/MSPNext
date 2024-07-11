import SchedulesDAL from '@/server/DAL/SchedulesDAL';
import { withAuth } from '@/middlewares/withAuth';
import { NextResponse } from 'next/server';

export const PUT = withAuth(async (req) => {
    const { pro_id } = params;
    const body = await req.json();
    
    const day_id = parseInt(body.day_id, 10);

    if (!body.day_id || isNaN(day_id) || day_id <= 0) {
        return NextResponse.json({ msg: "Jour invalide" }, { status: 400 });
    }

    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    if (!body.h_start_morning || !timePattern.test(body.h_start_morning)) {
        return NextResponse.json({ msg: "Heure de début du matin invalide" }, { status: 400 });
    }

    if (!body.h_end_morning || !timePattern.test(body.h_end_morning)) {
        return NextResponse.json({ msg: "Heure de fin du matin invalide" }, { status: 400 });
    }

    if (!body.h_start_afternoon || !timePattern.test(body.h_start_afternoon)) {
        return NextResponse.json({ msg: "Heure de début de l'après-midi invalide" }, { status: 400 });
    }

    if (!body.h_end_afternoon || !timePattern.test(body.h_end_afternoon)) {
        return NextResponse.json({ msg: "Heure de fin de l'après-midi invalide" }, { status: 400 });
    }

    try {
        const updatedSchedules = await SchedulesDAL.editSchedules(body, pro_id);
        return NextResponse.json({ result: updatedSchedules }, { status: 200 });
    } catch (error) {
        console.error('Problème lors de la modification des horaires:', error);
        return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 });
    }
})
