import {query} from "@/server/db"

console.log("NewsDAL loaded")

class NewsDAL {
    static async getNews(){
        try {
            const rows = await query('SELECT id, title, details, picture, external_link FROM news')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async deleteNew(id){
        try {
            const rows = await query('DELETE FROM news WHERE id= ?', [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewByID(id){
        try {
            const rows = await query('SELECT id, title, details, picture, external_link FROM news WHERE id = ?', [id] )
            return rows
        } catch (err) {
            throw err
        }
    }

    static async addNew(data) {
        const { title, details, externalLink, pictureUrl } = data.body

        let sqlRequest = 'INSERT INTO news (title, details, picture, external_link) VALUES(?, ?, ?, ?)';
        let params = [title, details, pictureUrl, externalLink];

        try {
            const result = await query(sqlRequest, params)
            return result
        } catch (err) {
            throw err
        }
    }

    static async updateNew(data, id) {
        const { title, details, externalLink, pictureUrl } = data.body

        let sqlRequest = 'UPDATE news SET title= ?, details= ?, external_link= ?'
        let params = [title, details, externalLink]
        
        if (pictureUrl) {
            sqlRequest += ', picture= ?' 
            params.push(pictureUrl) 
        }

        sqlRequest += ' WHERE id= ?' 
        params.push(id) 

        try {
            const result = await query(sqlRequest, params)
            return result 
        } catch (err) {
            console.error('DAL error:', err)
            throw err 
        }
    }
}

module.exports = NewsDAL

    

