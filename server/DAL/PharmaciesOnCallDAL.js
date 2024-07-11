const pool = require("@/server/db")

class PharmaciesOnCallDAL {

    static async getPharmaciesOnCall() {
        try {
            const [rows] = await pool.query('SELECT pharmacies.id, pharmacies.name, pharmacies.address, pharmacies.phone FROM pharmacies')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getPharmaciesOnCallAndSchedules() {
        try {
            const [rows] = await pool.query('SELECT pharmacies.id, pharmacies.name, pharmacies.address, pharmacies.phone, pharmacies_schedules.date, pharmacies_schedules.start_time, pharmacies_schedules.end_time FROM pharmacies INNER JOIN pharmacies_schedules ON pharmacies.id = pharmacies_schedules.pharmacy_id WHERE pharmacies_schedules.date = CURRENT_DATE')
            return rows
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static async addPharmaciesOnCall(req) {
        try  {
            const [rows] = await pool.query('INSERT INTO pharmacies (name, address, phone) VALUES (?, ?, ?)',
            [req.body.name, req.body.address, req.body.phone])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addSchedulesForPharmaciesOnCall(req) {
        try {
            const [rows] = await pool.query('INSERT INTO pharmacies_schedules (pharmacy_id, date, start_time, end_time) VALUES (?, ?, ?, ?)', [req.body.pharmacy_id, req.body.date, req.body.start_time, req.body.end_time])
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = PharmaciesOnCallDAL
