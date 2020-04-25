const mysqlx = require('@mysql/xdevapi');

const client = mysqlx.getClient('mysqlx://duke:password@vcm-14719.vm.duke.edu:33060', { pooling: { maxIdleTime: 1000 } });
module.exports = { client };
