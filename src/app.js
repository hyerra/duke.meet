const express = require('express');
const { User } = require('./db/User');
const { Job } = require('./db/Job');

const res = User.login('test@test.com');
res.then(user => {
    user.fetchDetails().then(() => {
        console.log(user);
    });
});

Job.getAllJobs().then(jobs => {
    console.log(jobs);
});
