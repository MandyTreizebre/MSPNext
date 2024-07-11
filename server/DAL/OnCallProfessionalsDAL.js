const pool = require("@/server/db")

class OnCallProfessionalsDAL {
    static async getProfessionalsOnCall(){
        try {
            const [rows] = await pool.query('SELECT professionals.id, professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.isActive, professionals.picture, specializations.name_spe, days.day_name, planning.h_start_morning, planning.h_end_morning, planning.h_start_afternoon, planning.h_end_afternoon FROM professionals JOIN planning ON professionals.id= planning.pro_id JOIN specializations ON professionals.speciality_id =  specializations.id JOIN days ON planning.day_id = days.id WHERE specializations.name_spe IN ("Médecins", "Dentistes", "Pharmacies") AND professionals.isActive = 1  ORDER BY professionals.lastname, professionals.firstname, days.id')
            return rows
        } catch (err) {
            throw err
        }
    }

}

module.exports = OnCallProfessionalsDAL