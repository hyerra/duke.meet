const express = require('express');
const { User } = require('./db/User');
const { Job } = require('./db/Job');
const { Project } = require('./db/Project');
const { Application } = require('./db/Application');
const application = require('./routes/application');
const job = require('./routes/job');
const project = require('./routes/project');
const user = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use('/application', application);
app.use('/jobs', job);
app.use('/project', project);
app.use('/user', user);

app.listen(port);