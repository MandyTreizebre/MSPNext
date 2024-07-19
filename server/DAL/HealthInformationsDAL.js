import {query} from "@/server/db"

class HealthInformationsDAL {   
    
    static async getCategories(){
        try {
            const rows = await query('SELECT id, name, picture FROM category_informations')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getInformations(){
        try {
            const rows = await query('SELECT id, title, description, picture, link, category FROM health_informations')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getInformationsByCategory(category){
        try {
            const rows = await query('SELECT hi.title, hi.description, hi.picture, hi.link, hi.category FROM health_informations hi INNER JOIN category_informations ci ON hi.category = ci.id WHERE category = ?', [category])
            return rows
        } catch (err) {
            console.error('Erreur dans getInformationsByCategory:', err)
            throw err
         }
    }

    static async deleteInformation(id){
        try {
            const rows = await query('DELETE FROM health_informations WHERE id= ?', [id])
            return rows
        } catch (err) {
            throw err
         }
    }

    static async getInformationByID(id){
        try {
            const rows = await query('SELECT id, title, description, picture, link, category FROM health_informations WHERE id = ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addInformation(data) {
        const { title, description, link, category, pictureUrl } = data.body

        let sqlRequest = 'INSERT INTO health_informations(title, description, picture, link, category) VALUES(?, ?, ?, ?, ?)'
        let params = [title, description, pictureUrl, link, category]
        
        try {
            const result = await query(sqlRequest, params)
            return result
        } catch (err) {
            throw err
        }
    }

    static async updateInformation(data, id) {
        const { title, description, link, category, picturePath } = data.body 

        let query = 'UPDATE health_informations SET title= ?, description= ?, link= ?, category= ?' 
        let queryParams = [title, description, link, category] 

        if (picturePath) {
            query += ', image= ?' 
            queryParams.push(picturePath) 
        } else if (data.body.existingImage) {
            query += ', image= ?' 
            queryParams.push(data.body.existingImage) 
        }

        query += ' WHERE id= ?' 
        queryParams.push(id) 

        try {
            const result = await query(query, queryParams)
            return result 
        } catch (err) {
            console.error('DAL error:', err)
            throw err 
        }
    }
}

module.exports = HealthInformationsDAL
