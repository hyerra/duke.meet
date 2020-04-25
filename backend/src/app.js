const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const application = require('./routes/application');
const job = require('./routes/job');
const project = require('./routes/project');
const user = require('./routes/user');

const strategy = require('./authentication/strategy');
const { User } = require('./db/User');

const app = express();
const port = process.env.PORT || 5000;

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
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/api/application', application);
app.use('/api/job', job);
app.use('/api/project', project);
app.use('/api/user', user);
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        req.logIn(user, function (loginError) {
            if (error) return res.send({ error: error.message });
            if (loginError) return res.send({ error: error.message });
            if (!user) return res.send({ error: 'Wrong username or password.' });
            res.send(user);
        });
    })(req, res, next);
});

app.listen(port);