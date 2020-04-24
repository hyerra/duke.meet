const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class Project extends Table {
    constructor(id, title, description) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static async table() {
        try {
            const session = await client.getSession();
            const table = session.getSchema('dukemeet').getTable('Project');
            return { session, table }
        } catch (error) {
            throw error;
        }
    }

    async fetchDetails() {
        try {
            const { session , table } = await Project.table();
            const query = await table
                .select()
                .where(`id = ${SqlString.escape(this.id)}`)
                .execute();

            const result = query.fetchOne();
            if (!result) throw new Error('No matching ids.');
            this.title = result[1];
            this.description =  result[2];
            session.close();
        } catch (error) {
            throw error;
        }
    }

    static async createProject(userID, title, description) {
        try {
            const { session , table } = await Project.table();
            const insertedRow = await table
                .insert('title', 'description')
                .values(title, description)
                .execute();
            const insertID = insertedRow.getAutoIncrementValue();
            session.close();
            return insertID;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProjects() {
        const projects = [];
        try {
            const { session , table } = await Project.table();
            const query = await table
                .select()
                .execute();
            const results = await query.toArray();
            session.close();
            if (!results) return projects;
            results.forEach(project => {
                projects.push(new Project(project[0], project[1], project[2]));
            });
            return projects;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { Project };