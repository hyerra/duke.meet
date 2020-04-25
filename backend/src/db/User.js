const SqlString = require('sqlstring');
const bcrypt = require('bcrypt');
const { client } = require('./db');
const { Table } = require('./Table');
const { Posting } = require('./Posting');

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

    static async register(email, year, major, password) {
        try {
            const { session , table } = await User.table();
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertedRow = await table
                .insert('email', 'year', 'major', 'hash_password')
                .values(email, year, major, hashedPassword)
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

    async fetchHashPassword() {
        try {
            const { session , table } = await User.table();
            const query = await table
                .select()
                .where(`id = ${SqlString.escape(this.id)}`)
                .execute();
            const result = await query.fetchOne();
            session.close();
            if (!result) throw new Error('No matching user with id.');
            return result[5];
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
            this.name = result[1]
            this.email = result[2];
            this.major = result[3];
            this.year = result[4];
        } catch (error) {
            throw error;
        }
    }

    async fetchProjectIDs() {
        try {
            const postings = await Posting.getPostings(this.id);
            return postings.map(posting => posting.projectID);
        } catch (error) {
            throw error;
        }
    }

    static async serializeUser(user, done) {
        done(null, user.id);
    }

    static async deserializeUser(id, done) {
        try {
            const user = new User(id);
            await user.fetchDetails();
            done(null, user);
        } catch (error) {
            done(error, null)
        }
    }
}

module.exports = { User };