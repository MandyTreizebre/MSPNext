const bcrypt = require('bcrypt') 
const saltRounds = 10 

import {query} from "@/server/db"

class AdminsDAL {

    static async getAdminByEmail(email) {
        try {
            const rows = await query('SELECT id, email, password, firstname, reset_token, reset_token_expiration FROM admin WHERE email = ?', [email])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getAdminByID(id) {
        try {
            const rows = await query('SELECT id,email, password, firstname FROM admin WHERE id = ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = AdminsDAL


