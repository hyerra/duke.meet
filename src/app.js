const express = require('express');
const cors = require('cors');

const application = require('./routes/application');
const job = require('./routes/job');
const project = require('./routes/project');
const user = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/application', application);
app.use('/jobs', job);
app.use('/project', project);
app.use('/user', user);

app.listen(port);