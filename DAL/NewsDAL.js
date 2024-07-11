const pool = require("@/db")

class NewsDAL {
    static async getNews(){
        try {
            const [rows] = await pool.query('SELECT id, title, details, picture, external_link FROM news')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async deleteNew(id){
        try {
            const [rows] = await pool.query('DELETE FROM news WHERE id= ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewByID(id){
        try {
            const [rows] = await pool.query('SELECT id, title, details, picture, external_link FROM news WHERE id = ?', [id] )
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addNew(data) {
        const { title, details, externalLink, picturePath } = data.body

        let query = 'INSERT INTO news (title, details, picture, external_link) VALUES(?, ?, ?, ?)';
        let queryParams = [title, details, picturePath, externalLink];

        try {
            const [result] = await pool.query(query, queryParams);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async updateNew(data, id) {
        const { title, details, externalLink, picturePath } = data.body

        let query = 'UPDATE news SET title= ?, details= ?, external_link= ?'
        let queryParams = [title, details, externalLink]
        
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

module.exports = NewsDAL

    

