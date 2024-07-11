const pool = require("@/db")

class HealthInformationsDAL {   
    
    static async getCategories(){
        try {
            const [rows] = await pool.query('SELECT id, name, picture FROM category_informations')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getInformations(){
        try {
            const [rows] = await pool.query('SELECT id, title, description, image, link, category FROM health_informations')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getInformationsByCategory(category){
        try {
            const [rows] = await pool.query('SELECT title, description, image, link, category FROM health_informations INNER JOIN category_informations ON health_informations.category = category_informations.id WHERE category = ?', [category])
            return rows
        } catch (err) {
            throw err
         }
    }

    static async deleteInformation(id){
        try {
            const [rows] = await pool.query('DELETE FROM health_informations WHERE id= ?', [id])
            return rows
        } catch (err) {
            throw err
         }
    }

    static async getInformationByID(id){
        try {
            const [rows] = await pool.query('SELECT id, title, description, image, link, category FROM health_informations WHERE id = ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addInformation(data) {
        const { title, description, link, category, picturePath } = data.body

        let query = 'INSERT INTO health_informations(title, description, image, link, category) VALUES(?, ?, ?, ?, ?)'
        let queryParams = [title, description, picturePath, link, category]
    
        try {
            const [result] = await pool.query(query, queryParams)
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
            const [result] = await pool.query(query, queryParams)
            return result 
        } catch (err) {
            console.error('DAL error:', err)
            throw err 
        }
    }
}

module.exports = HealthInformationsDAL
