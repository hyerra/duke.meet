const { client } = require('./db');
const { Table } = require('./Table');

class Skill extends Table {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }

    static async table() {
        try {
            const session = await client.getSession();
            const table = session.getSchema('dukemeet').getTable('Skill');
            return {session, table};
        } catch (error) {
            throw error;
        }
    }

    static async getAllSkills() {
        const skills = [];
        try {
            const { session, table } = await Project.table();
            const query = await table
                .select()
                .execute();

            const results = query.toArray();
            session.close();
            if (!results) return skills;
            results.forEach((project) => {
                skills.push(new Skill(project[0], project[1]));
            });
            return skills;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { Skill };