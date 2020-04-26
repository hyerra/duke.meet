const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const application = require('./routes/application');
const job = require('./routes/job');
const project = require('./routes/project');
const skill = require('./routes/skill');
const user = require('./routes/user');

const strategy = require('./authentication/strategy');
const { User } = require('./db/User');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

passport.use(strategy);

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('trust proxy', 1);
app.use(session({
  secret: 'dskjfoiewjaomofaicu8eurowijocijziosu8fwjonsoifojewofiegho',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/api/application', application);
app.use('/api/job', job);
app.use('/api/project', project);
app.use('/api/skill', skill);
app.use('/api/user', user);
app.post('/api/user/login', (req, res, next) => {
  passport.authenticate('local', (error, retrievedUser) => {
    req.logIn(retrievedUser, (loginError) => {
      if (error) return res.status(401).send({ error: error.message });
      if (loginError) return res.status(401).send({ error: error.message });
      if (!retrievedUser) return res.status(401).send({ error: 'Wrong username or password.' });
      res.send(retrievedUser);
    });
  })(req, res, next);
});

app.listen(port);
