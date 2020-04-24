const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class User extends Table {
    constructor(id) {
        super();
        this.id = id;
    }

    static async table() {
        try {
            const session = await client.getSession();
            return session.getSchema('dukemeet').getTable('User');
        } catch (error) {
            throw error;
        }
    }

    static async register(email, year, major) {
        try {
            const table = await User.table();
            const insertedRow = await table
                .insert('email', 'year', 'major')
                .values(email, year, major)
                .execute();
            return await insertedRow.getAutoIncrementValue();
        } catch (error) {
            throw error;
        }
    }

    static async login(email) {
        try {
            const table = await User.table();
            const query = await table
                .select()
                .where(`email = ${SqlString.escape(email)}`)
                .execute();
            const result = await query.fetchOne();
            if (!result) throw new Error('No matching email.');
            return new User(result[0]);
        } catch (error) {
            throw error;
        }
    }

    async fetchDetails() {
        try {
            const table = await User.table();
            const query = await table
                .select()
                .where(`id = ${SqlString.escape(this.id)}`)
                .execute();
            const result = await query.fetchOne();
            if (!result) throw new Error('No matching user with id.');
            this.email = result[1];
            this.year = result[2];
            this.major = result[3];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    User
};