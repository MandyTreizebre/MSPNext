import SchedulesDAL from "@/server/DAL/SchedulesDAL";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { pro_id, day_id } = params;

    try {
        const schedules = await SchedulesDAL.getSchedulesByProAndDay(pro_id, day_id);
        return NextResponse.json(schedules, { status: 200 });
    } catch (error) {
        console.error(`Erreur lors de la récupération des horaires: ${error}`);
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}
