const express = require('express');
const cors = require('cors');
const passport = require('passport');

const application = require('./routes/application');
const job = require('./routes/job');
const project = require('./routes/project');
const user = require('./routes/user');

const strategy = require('./authentication/strategy');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api/application', application);
app.use('/api/job', job);
app.use('/api/project', project);
app.use('/api/user', user);
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

app.listen(port);