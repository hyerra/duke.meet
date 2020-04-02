const express = require('express');
const { User } = require('./db/User');

const res = User.login('test@test.com');
res.then(user => {
    user.fetchDetails().then(() => {
        console.log(user);
    });
});

