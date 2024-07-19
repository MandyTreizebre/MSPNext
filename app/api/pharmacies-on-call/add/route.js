import PharmaciesOnCallDAL from "@/server/DAL/PharmaciesOnCallDAL";
import { NextResponse } from 'next/server';
import { withAuth } from '@/middlewares/withAuth';

export const POST = withAuth(async (req) => {
  try {
    if (!req.json) {
      console.error("req.json is not a function");
      return NextResponse.json({ msg: 'Invalid request format' }, { status: 400 });
    }

    const body = await req.json();
    const { name, address, phone } = body;

    // Vérification des données dans les champs par rapport aux regex
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,200}$/u.test(name)) {
      return NextResponse.json({ msg: 'Nom invalide' }, { status: 400 });
    }

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s'’`-]{1,200}$/u.test(address)) {
      return NextResponse.json({ msg: 'Adresse invalide' }, { status: 400 });
    }

    if (!/^\d{1,10}$/.test(phone)) {
      return NextResponse.json({ msg: 'Téléphone invalide' }, { status: 400 });
    }

    const addedPharmacies = await PharmaciesOnCallDAL.addPharmaciesOnCall({ body: { name, address, phone } });

    if (addedPharmacies.code) {
      return NextResponse.json({ msg: 'Problème lors de l\'ajout de la pharmacie' }, { status: 500 });
    }

    return NextResponse.json({ result: addedPharmacies }, { status: 201 });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la pharmacie:', err);
    return NextResponse.json({ msg: 'Problème lors de l\'ajout de la pharmacie' }, { status: 500 });
  }
})


