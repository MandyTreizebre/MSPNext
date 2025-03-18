import OnCallProfessionalsDAL from "@/server/DAL/OnCallProfessionalsDAL"
import { NextResponse } from 'next/server'
import { withAuth } from '@/middlewares/withAuth'

export const POST = withAuth(async(req) => {
    try {
      const { pro_id, date, start_time, end_time } = await req.json();
      const proId = parseInt(pro_id, 10);
  
      if (!pro_id || isNaN(proId) || proId <= 0) {
        return NextResponse.json({ msg: 'Professionnel invalide' }, { status: 400 });
      }
  
      const addedSchedules = await OnCallProfessionalsDAL.addSchedulesProsOnCall({
        body: { pro_id, date, start_time, end_time },
      });
  
      if (addedSchedules.code) {
        console.log("addedSchedules.code =>" ,addedSchedules.code)
        return NextResponse.json({ msg: 'Problème lors de l\'ajout de la garde' }, { status: 500 });
      }
  
      return NextResponse.json({ result: addedSchedules }, { status: 201 });
    } catch (err) {
      console.error('Erreur dans la route:', err);
      return NextResponse.json({ msg: 'Problème lors de l\'ajout de la garde' }, { status: 500 });
    }
  })
  