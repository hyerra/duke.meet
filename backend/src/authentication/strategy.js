const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../db/User');

const strategy = new LocalStrategy(async (email, password, done) => {
    try {
        const user = await User.login();
        await user.fetchDetails();
        const match = await bcrypt.compare(password, user.hashPassword);
        match ? done(null, user) : done(null, false);
    } catch (error) {
        return done(error);
    }
});

module.exports = strategy;