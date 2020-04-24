const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class Job extends Table {
    constructor(id, projectID, title, payment, timeCommitment) {
        super();
        this.id = id;
        this.projectID = projectID;
        this.title = title;
        this.payment = payment;
        this.timeCommitment = timeCommitment;
    }

    static async table() {
        try {
            const session = await client.getSession();
            const table = session.getSchema('dukemeet').getTable('Job');
            return { session, table }
        } catch (error) {
            throw error;
        }
    }

    static async createJobListing(projectID, title, payment, timeCommitment) {
        try {
            const table = await Job.table();
            const insertedRow = await table
                .insert('project_id', 'title', 'payment', 'time_commitment')
                .values(projectID, title, payment, timeCommitment)
                .execute();
            const insertID = await insertedRow.getAutoIncrementValue();
            session.close();
            return insertID;
        } catch (error) {
            throw error;
        }
    }

    static async getJobs(projectID) {
        const jobs = [];
        try {
            const { session, table } = await Job.table();
            const query = await table
                .select()
                .where(`project_id = ${SqlString.escape(projectID)}`)
                .execute();
            const results = await query.toArray();
            session.close();
            if (!results) return jobs;

            results.forEach(jobRes => {
                const job = new Job(jobRes[0], jobRes[1], jobRes[2], jobRes[3], jobRes[4]);
                jobs.push(job);
            });
            return jobs;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    Job
};