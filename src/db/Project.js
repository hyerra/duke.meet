const db = require('./db');

class Project {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    async fetchDetails() {
        const query = `SELECT * FROM Project WHERE id = '${this.id}';`;
        try {
            const result = await db.executeQuery(query);
            const projectResult = result[0];
            this.title = projectResult.title;
            this.description = projectResult.description;
        } catch (error) {
            throw error;
        }
    }

    async createProject(title, description) {
        const query = `INSERT INTO Project (title, description) VALUES ('${title}', '${description}');`;
        try {
            const result = await db.executeQuery(query);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProjects() {
        const query = `SELECT * FROM Project;`;
        const projects = [];
        try {
            const results = await db.executeQuery(query);
            results.forEach(project => {
                projects.push(new Project(project.id, project.title, project.description));
            });
            return projects;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    Project
};