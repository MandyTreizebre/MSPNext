import { withAuth } from '@/middlewares/withAuth'
import ProfessionalsDAL from '@/server/DAL/ProfessionalsDAL'
import { NextResponse } from 'next/server'
import validator from 'validator'

export const PUT = withAuth(async (req) => {
    const { id } = params;
    const { lastname, firstname, address, zip, city, phone, details, speciality_id } = await req.json();

    // Input cleaning
    const cleanLastname = validator.trim(lastname);
    const cleanFirstname = validator.trim(firstname);
    const cleanAddress = validator.trim(address);
    const cleanZip = validator.trim(zip);
    const cleanCity = validator.trim(city);
    const cleanPhone = validator.trim(phone);
    const cleanDetails = validator.trim(details);

    // Validation regex
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,100}$/u.test(cleanLastname)) {
        return NextResponse.json({ msg: "Nom invalide" }, { status: 400 });
    }
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'’`-]{1,50}$/u.test(cleanFirstname)) {
        return NextResponse.json({ msg: "Prénom invalide" }, { status: 400 });
    }
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s'’`-]{1,50}$/u.test(cleanAddress)) {
        return NextResponse.json({ msg: "Adresse invalide" }, { status: 400 });
    }
    if (!/^\d{1,5}$/.test(cleanZip)) {
        return NextResponse.json({ msg: "Code postal invalide" }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9 \-\'’‘éàèùâêîôûäëïöüçñ]{1,50}$/.test(cleanCity)) {
        return NextResponse.json({ msg: "Ville invalide" }, { status: 400 });
    }
    if (!/^\d{1,10}$/.test(cleanPhone)) {
        return NextResponse.json({ msg: "Téléphone invalide" }, { status: 400 });
    }
    if (details && !/^[a-zA-Z0-9 \-\/:'éàèùâêîôûäëïöüçñ’\.]{0,100}$/.test(cleanDetails)) {
        return NextResponse.json({ msg: "Détails invalides" }, { status: 400 })
    }

    // Update professional
    try {
        const updatedPro = await ProfessionalsDAL.editProfessional({ body: { lastname: cleanLastname, firstname: cleanFirstname, address: cleanAddress, zip: cleanZip, city: cleanCity, phone: cleanPhone, details: cleanDetails, speciality_id } }, id);
        
        if (updatedPro.affectedRows === 0) {
            return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 });
        }
        
        return NextResponse.json({ msg: "Professionnel modifié", result: updatedPro }, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la modification du professionnel:', error);
        return NextResponse.json({ msg: "Erreur interne du serveur" }, { status: 500 });
    }
})

