import {query} from "@/server/db"

class ExternalProfessionalsDAL {
    static async getExternalPros() {
        try {
            const rows = await query('SELECT id, name, picture, link from external_professionals')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addExternalPro(data) {
        const { name, link, picture } = data.body 

        let query = 'INSERT INTO external_professionals (name, link, picture) VALUES (?, ?, ?)' 
        let queryParams = [name, link, picture] 

        try {
            const result = await query(query, queryParams) 
            return result 
        } catch (err) {
            throw err 
        }
    }

    static async updateExternalPro(data, id) {
        const { name, link, picture } = data.body 

        let query = 'UPDATE external_professionals SET name = ?, link = ?' 
        let queryParams = [name, link] 

        if (picture) {
            query += ', picture = ?' 
            queryParams.push(picture) 
        }

        query += ' WHERE id = ?' 
        queryParams.push(id) 

        try {
            const result = await query(query, queryParams) 
            return result 
        } catch (err) {
            throw err 
        }
    }
    
    static async deleteExternalPro(id){
        try {
            const rows = await query('DELETE FROM external_professionals WHERE id= ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getExternalProByID(id){
        try {
            const rows = await query('SELECT id, name, picture, link FROM external_professionals WHERE id = ?',[id])
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = ExternalProfessionalsDAL