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
            const table = session.getSchema('dukemeet').getTable('User');
            return { session , table }
        } catch (error) {
            throw error;
        }
    }

    static async register(email, year, major) {
        try {
            const { session , table } = await User.table();
            const insertedRow = await table
                .insert('email', 'year', 'major')
                .values(email, year, major)
                .execute();
            const insertID = await insertedRow.getAutoIncrementValue();
            session.close();
            return insertID;
        } catch (error) {
            throw error;
        }
    }

    static async login(email) {
        try {
            const { session , table } = await User.table();
            const query = await table
                .select()
                .where(`email = ${SqlString.escape(email)}`)
                .execute();
            const result = await query.fetchOne();
            session.close();
            if (!result) throw new Error('No matching email.');
            return new User(result[0]);
        } catch (error) {
            throw error;
        }
    }

    async fetchDetails() {
        try {
            const { session , table } = await User.table();
            const query = await table
                .select()
                .where(`id = ${SqlString.escape(this.id)}`)
                .execute();
            const result = await query.fetchOne();
            session.close();
            if (!result) throw new Error('No matching user with id.');
            this.email = result[1];
            this.year = result[2];
            this.major = result[3];
            this.hashPassword = result[4];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { User };