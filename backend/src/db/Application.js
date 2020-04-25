const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class Application extends Table {
  constructor(userID, jobID, date, applicationStatement) {
    super();
    this.userID = userID;
    this.jobID = jobID;
    this.date = date;
    this.applicationStatement = applicationStatement;
  }

  static async table() {
    try {
      const session = await client.getSession();
      const table = session.getSchema('dukemeet').getTable('Application');
      return { session, table };
    } catch (error) {
      throw error;
    }
  }

  static async getAllApplications(projectID) {
    const applications = [];
    try {
      const { session } = await client.getSession();
      const query = await session.sql(`SELECT Application.user_id, Application.job_id, Application.date, Application.application_statement FROM dukemeet.Application, dukemeet.Job WHERE Application.job_id = Job.id AND Job.project_id = ${SqlString.escape(projectID)};`)
        .execute();
      const results = await query.toArray();
      session.close();
      if (!results) return applications;
      results.forEach((application) => {
        applications.push(new Application(application[0], application[1], application[2], application[3]));
      });
      return applications;
    } catch (error) {
      throw error;
    }
  }

  static async apply(userID, jobID, applicationStatement) {
    try {
      const { session, table } = await Application.table();
      const insertedRow = await table
        .insert('user_id', 'job_id', 'date', 'application_statement')
        .values(userID, jobID, new Date().toJSON().slice(0, 10), applicationStatement)
        .execute();
      const insertID = await insertedRow.getAutoIncrementValue();
      session.close();
      return insertID;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Application };
