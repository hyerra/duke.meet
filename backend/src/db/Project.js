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
      return { session, table };
    } catch (error) {
      throw error;
    }
  }

  async fetchDetails() {
    try {
      const { session, table } = await Project.table();
      const query = await table
        .select()
        .where(`id = ${SqlString.escape(this.id)}`)
        .execute();

      const result = query.fetchOne();
      session.close();
      if (!result) throw new Error('No matching ids.');
      [, this.title, this.description] = result;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      const { session, table } = await Project.table();
      await table
          .update()
          .where(`id = ${SqlString.escape(this.id)}`)
          .set('title', this.title)
          .set('description', this.description)
          .execute();
      session.close();
    } catch (error) {
      throw error;
    }
  }

  static async createProject(userID, title, description) {
    const { session, table } = await Project.table();
    const postingTable = session.getSchema('dukemeet').getTable('Posting');
    try {
      await session.startTransaction();
      const insertedRow = await table
        .insert('title', 'description')
        .values(title, description)
        .execute();
      const insertID = insertedRow.getAutoIncrementValue();
      await postingTable
          .insert('user_id', 'project_id', 'date')
          .values(userID, insertID, new Date().toJSON().slice(0, 10))
          .execute();
      await session.commit();
      session.close();
      return insertID;
    } catch (error) {
      session.rollback();
      throw error;
    }
  }

  static async getAllProjects() {
    const projects = [];
    try {
      const { session, table } = await Project.table();
      const query = await table
        .select()
        .execute();
      const results = await query.toArray();
      session.close();
      if (!results) return projects;
      results.forEach((project) => {
        projects.push(new Project(project[0], project[1], project[2]));
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Project };
