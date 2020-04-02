const db = require('./db');

class User {
    constructor(id) {
        this.id = id;
    }

    static async register(email, year, major) {
        const query = `INSERT INTO User (email, year, major) VALUES ('${email}', '${year}', '${major}');`;
        try {
            const result = await db.executeQuery(query);
            if (!result.insertId) throw new Error('Failed to register user');
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async login(email) {
        const query = `SELECT id FROM User WHERE email = '${email}';`;
        try {
            const result = await db.executeQuery(query);
            return new User(result[0].id);
        } catch (error) {
            throw error;
        }
    }

    async fetchDetails() {
        const query = `SELECT * FROM User WHERE id = '${this.id}';`;
        try {
            const result = await db.executeQuery(query);
            const userInfo = result[0];
            this.email = userInfo.email;
            this.year = userInfo.year;
            this.major = userInfo.major;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    User
};