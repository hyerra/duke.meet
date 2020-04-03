const db = require('./db');

class Job {
    constructor(id, projectID, title, payment, timeCommitment) {
        this.id = id;
        this.projectID = projectID;
        this.title = title;
        this.payment = payment;
        this.timeCommitment = timeCommitment;
    }

    static async createJobListing(projectID, title, payment, timeCommitment) {
        const query = `INSERT INTO Job (project_id, title, payment, time_commitment) VALUES ('${projectID}', '${title}', '${payment}', '${timeCommitment}');`;
        try {
            const result = await db.executeQuery(query);
            if (!result.insertId) throw new Error('Failed to insert job listing');
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getJobs(projectID) {
        const query = `SELECT * FROM Job WHERE project_id = ${projectID};`;
        const jobs = [];
        try {
            const results = await db.executeQuery(query);
            results.forEach(jobRes => {
                const job = new Job(jobRes.id, jobRes.project_id, jobRes.title, jobRes.payment, jobRes.time_commitment);
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