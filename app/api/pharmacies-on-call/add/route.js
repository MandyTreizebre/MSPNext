import PharmaciesOnCallDAL from "@/DAL/PharmaciesOnCallDAL" 
import { NextResponse } from 'next/server' 
import { withAuth } from '@/middlewares/withAuth' 

async function handler(req) {
  if (req.method === 'POST') {
    try {
      const { name, address, phone } = await req.json() 
      console.log('Received data:', { name, address, phone }) 

      // Vérification des données dans les champs par rapport aux regex
      if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,200}$/u.test(name)) {
        console.log('Invalid name') 
        return NextResponse.json({ msg: 'Nom invalide' }, { status: 400 }) 
      }

      if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s'’`-]{1,200}$/u.test(address)) {
        console.log('Invalid address') 
        return NextResponse.json({ msg: 'Adresse invalide' }, { status: 400 }) 
      }

      if (!/^\d{1,10}$/.test(phone)) {
        console.log('Invalid phone') 
        return NextResponse.json({ msg: 'Téléphone invalide' }, { status: 400 }) 
      }

      const addedPharmacies = await PharmaciesOnCallDAL.addPharmaciesOnCall({ body: { name, address, phone } }) 
      console.log('Pharmacy added:', addedPharmacies) 

      if (addedPharmacies.code) {
        console.log('Error adding pharmacy:', addedPharmacies.code) 
        return NextResponse.json({ msg: 'Problème lors de l\'ajout de la pharmacie' }, { status: 500 }) 
      }

      return NextResponse.json({ result: addedPharmacies }, { status: 201 }) 
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la pharmacie:', err) 
      return NextResponse.json({ msg: 'Problème lors de l\'ajout de la pharmacie' }, { status: 500 }) 
    }
  } else {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 }) 
  }
}

export const POST = withAuth(handler) 
