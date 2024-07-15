import {query} from "@/server/db"

class SchedulesDAL {

    static async getSchedules(){
        try {
            const rows = await query('SELECT pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon FROM planning')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getDays(){
        try {
            const rows = await query('SELECT id, day_name FROM days')
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getSchedulesByProAndDay(pro_id, day_id) {
        try {
            const rows = await query(
                'SELECT pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon FROM planning WHERE pro_id = ? AND day_id = ?',
                [pro_id, day_id]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async addSchedules(data){
        const { pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon } = data
        try {
            const rows = await query(
                'INSERT INTO planning (pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon) VALUES (?, ?, ?, ?, ?, ?)',
                [pro_id, day_id, h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon]
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    static async editSchedules(data, pro_id) {
        try {
            const { h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon, day_id } = data;
            const rows = await query(
                'UPDATE planning SET h_start_morning= ?, h_end_morning= ?, h_start_afternoon= ?, h_end_afternoon= ? WHERE pro_id= ? AND day_id= ?',
                [h_start_morning, h_end_morning, h_start_afternoon, h_end_afternoon, pro_id, day_id]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SchedulesDAL
