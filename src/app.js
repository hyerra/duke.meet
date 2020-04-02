const express = require('express');
const { User } = require('./db/User');
const { Job } = require('./db/Job');
const { Project } = require('./db/Project');
const { Application } = require('./db/Application');
const application = require('./routes/application');

const app = express();
const port = process.env.PORT || 3000;

app.use('/application', application);


// const res = User.login('test@test.com');
// res.then(user => {
//     user.fetchDetails().then(() => {
//         console.log(user);
//     });
// });
//
// Job.getAllJobs().then(jobs => {
//     console.log(jobs);
// });
//
// Application.getAllApplications(2).then(applications => {
//     console.log(applications);
// });

app.listen(port);