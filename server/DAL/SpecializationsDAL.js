const pool = require('@/server/db')

class SpecializationsDAL {
    static async getSpecializations() {
        try {
            const [rows] = await pool.query('SELECT id, name_spe, picture, key_url FROM specializations')
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = SpecializationsDAL
