import {query} from "@/server/db"

class OnCallProfessionalsDAL {
    /*static async getProfessionalsOnCall(){
        try {
            const rows = await query("SELECT professionals.id, professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.isActive, professionals.picture, specializations.name_spe, days.day_name, planning.h_start_morning, planning.h_end_morning, planning.h_start_afternoon, planning.h_end_afternoon FROM professionals JOIN planning ON professionals.id= planning.pro_id JOIN specializations ON professionals.speciality_id =  specializations.id JOIN days ON planning.day_id = days.id WHERE specializations.name_spe IN ('Médecins', 'Dentistes', 'Pharmacies') AND professionals.isActive = 1  ORDER BY professionals.lastname, professionals.firstname, days.id")
            return rows
        } catch (err) {
            throw err
        }
    }*/

   //Récupérer les médecins et les pharmacies + leurs horaires standards pour la garde     
    static async GetProsOnCall() {
        try {
            const rows = await query("SELECT professionals.id, professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.details, professionals.picture, JSON_AGG(JSON_BUILD_OBJECT('day_name', d.day_name, 'morning_start', planning.h_start_morning, 'morning_end', planning.h_end_morning, 'afternoon_start', planning.h_start_afternoon, 'afternoon_end', planning.h_end_afternoon) ORDER BY d.id) AS weekly_schedule FROM professionals JOIN planning ON professionals.id = planning.pro_id JOIN days d ON planning.day_id = d.id WHERE professionals.speciality_id IN (6, 10) GROUP BY professionals.id, professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.details, professionals.picture ORDER BY professionals.lastname, professionals.firstname");
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //Récupérer les médecins et pharmacies + leurs horaires de garde
    static async GetSchedulesOnCall(){
        try {
            const rows = await query("SELECT professionals.id AS professional_id, schedules_on_call.date, schedules_on_call.start_time, schedules_on_call.end_time FROM professionals JOIN schedules_on_call ON professionals.id = schedules_on_call.pro_id");
            return rows
        } catch (err) {
            throw err
        }
    }


    static async addSchedulesProsOnCall(req) {
        try {
            const rows = await query('INSERT INTO schedules_on_call (pro_id, date, start_time, end_time) VALUES (?, ?, ?, ?)', [req.body.pro_id, req.body.date, req.body.start_time, req.body.end_time])
            return rows
        } catch (err) {
            throw err
        }
    }
        
}

module.exports = OnCallProfessionalsDAL