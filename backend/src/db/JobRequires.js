const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class JobRequires extends Table {
    constructor(jobID, skillID) {
        super();
        this.jobID = jobID;
        this.skillID = skillID;
    }

    static async table() {
        try {
            const session = await client.getSession();
            const table = session.getSchema('dukemeet').getTable('JobRequires');
            return { session, table };
        } catch (error) {
            throw error;
        }
    }

    static async fetchSkillsForJob(jobID) {
        const skills = [];
        try {
            const { session, table } = await Project.table();
            const query = await table
                .select()
                .where(`job_id = ${SqlString.escape(jobID)}`)
                .execute();

            const results = query.toArray();
            session.close();
            if (!results) return skills;
            results.forEach((skill) => {
                skills.push(new JobRequires(skill[0], skill[1]));
            });
            return skills;
        } catch (error) {
            throw error;
        }
    }

    static async clearSkillsForJob(jobID) {
        try {
            const { session, table } = await Project.table();
            await table
                .delete()
                .where(`job_id = ${SqlString.escape(jobID)}`)
                .execute();
            session.close();
        } catch (error) {
            throw error;
        }
    }

    static async setSkillsForJob(requirements) {
        try {
            const { session, table } = await Project.table();
            for (const requirement of requirements) {
                await table
                    .insert('job_id', 'skill_id')
                    .values(requirement.jobID, requirement.skillID)
                    .execute();
            }
            session.close();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { JobRequires };