const db = require('./db');

class Job {
    constructor(id, projectID, title, payment, timeCommitment) {
        this.id = id;
        this.projectID = projectID;
        this.title = title;
        this.payment = payment;
        this.timeCommitment = timeCommitment;
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