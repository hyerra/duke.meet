const db = require('./db');

class Application {
    constructor(userID, jobID, date) {
        this.userID = userID;
        this.jobID = jobID;
        this.date = date;
    }

    static async getAllApplications(projectID) {
        const query = `SELECT Application.user_id, Application.job_id, Application.date FROM Application, Job WHERE Application.job_id = Job.id AND Job.project_id = ${projectID};`;
        const applications = [];
        try {
            const results = await db.executeQuery(query);
            results.forEach(application => {
                applications.push(new Application(application.user_id, application.job_id, application.date));
            });
            return applications;
        } catch (error) {
            throw error;
        }
    }

    static async apply(userID, jobID) {
        const query = `INSERT INTO Application (user_id, job_id, date) VALUES ('${userID}', '${jobID}', '${new Date().toJSON().slice(0, 10)}');`;
        try {
            const result = await db.executeQuery(query);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    Application
};