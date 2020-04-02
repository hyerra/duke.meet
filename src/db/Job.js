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
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getAllJobs() {
        const query = 'SELECT * FROM Job;';
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