import PharmaciesOnCallDAL from "@/DAL/PharmaciesOnCallDAL";
import { NextResponse } from 'next/server';
import { withAuth } from '@/middlewares/withAuth';

async function handler(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
  }

  try {
    const { pharmacy_id, date, start_time, end_time } = await req.json();
    const pharmacyId = parseInt(pharmacy_id, 10);

    if (!pharmacy_id || isNaN(pharmacyId) || pharmacyId <= 0) {
      return NextResponse.json({ msg: 'Pharmacie invalide' }, { status: 400 });
    }

    const addedSchedules = await PharmaciesOnCallDAL.addSchedulesForPharmaciesOnCall({
      body: { pharmacy_id, date, start_time, end_time },
    });

    if (addedSchedules.code) {
      console.log('.code dans la route =>', addedSchedules.code);
      return NextResponse.json({ msg: 'Problème lors de l\'ajout de la garde' }, { status: 500 });
    }

    return NextResponse.json({ result: addedSchedules }, { status: 201 });
  } catch (err) {
    console.error('Erreur dans la route:', err);
    return NextResponse.json({ msg: 'Problème lors de l\'ajout de la garde' }, { status: 500 });
  }
}

export const POST = withAuth(handler);