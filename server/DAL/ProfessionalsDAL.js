import {query} from "@/server/db"

class ProfessionalsDAL {
    static async getProBySpe(speciality_id){
        try {
            const rows = await query('SELECT DISTINCT professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.details,professionals.picture, d.day_name AS day_name, planning.h_start_morning, planning.h_end_morning, planning.h_start_afternoon, planning.h_end_afternoon FROM professionals JOIN planning  ON professionals.id = planning.pro_id JOIN days d on planning.day_id = d.id WHERE professionals.speciality_id = ? AND professionals.isActive = 1', [speciality_id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getProByID(id){
        try {
            const rows = await query('SELECT lastname, firstname, address, zip, city, phone, details, speciality_id FROM professionals  WHERE id = ?',[id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getProfessionalsAndHours(){
        try {
            const rows = await query('SELECT DISTINCT professionals.id, professionals.lastname, professionals.firstname, professionals.address, professionals.zip, professionals.city, professionals.phone, professionals.details, professionals.speciality_id, professionals.isActive, d.day_name AS day_name, planning.h_start_morning, planning.h_end_morning, planning.h_start_afternoon, planning.h_end_afternoon FROM professionals JOIN planning  ON professionals.id = planning.pro_id JOIN days d on planning.day_id = d.id')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getProfessionals(){
        try {
            const rows = await query('SELECT id, lastname, firstname, address, zip, city, phone, details, speciality_id FROM professionals')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getProfessionals(){
        try {
            const rows = await query('SELECT id, lastname, firstname, address, zip, city, phone, details, speciality_id FROM professionals')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addProfessional(req){

        let defaultImage = "default-image-professional.png"

        try {
            const rows = await query('INSERT INTO professionals (lastname, firstname, address, zip, city, phone, details, speciality_id, picture)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.lastname, req.body.firstname, req.body.address, req.body.zip, req.body.city, req.body.phone, req.body.details, req.body.speciality_id, defaultImage])
                return rows
        } catch (err) {
            throw err
        }
    }

    
    static async editProfessional(req, id){
        try {
            const rows = await query('UPDATE professionals SET lastname= ?, firstname= ?, address=?, zip= ?, city= ?, phone= ?, details= ?, speciality_id= ? WHERE id= ?',
        [req.body.lastname, req.body.firstname, req.body.address, req.body.zip, req.body.city, req.body.phone, req.body.details, req.body.speciality_id, id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async ChangeProfessionalStatus(id){
        try {
            const rows = await query('UPDATE professionals SET isActive = NOT isActive WHERE id = ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }
}
    
module.exports = ProfessionalsDAL
    