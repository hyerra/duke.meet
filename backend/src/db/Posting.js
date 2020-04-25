const SqlString = require('sqlstring');
const { client } = require('./db');
const { Table } = require('./Table');

class Posting extends Table {
  constructor(userID, projectID, date) {
    super();
    this.userID = userID;
    this.projectID = projectID;
    this.date = date;
  }

  static async table() {
    try {
      const session = await client.getSession();
      const table = session.getSchema('dukemeet').getTable('Posting');
      return { session, table };
    } catch (error) {
      throw error;
    }
  }

  static async getPostings(userID) {
    const postings = [];
    try {
      const { session, table } = await Posting.table();
      const query = await table
        .select()
        .where(`user_id = ${SqlString.escape(userID)}`)
        .execute();
      const results = await query.toArray();
      session.close();
      if (!results) return postings;
      results.forEach((posting) => {
        postings.push(new Posting(posting[0], posting[1], posting[2]));
      });
      return postings;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Posting };
