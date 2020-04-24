const mysqlx = require('@mysql/xdevapi');

const client = mysqlx.getClient('mysqlx://root:password@localhost:33060', { pooling: { maxIdleTime: 1000 } });
module.exports = { client };