const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../db/User');

const strategy = new LocalStrategy(async (email, password, done) => {
    try {
        const user = await User.login();
        await user.fetchDetails();
        bcrypt.compare(password, user.hashPassword, (error, result) => {
            if (error) {
                done(error);
                return;
            } else if (result) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    } catch (error) {
        return done(error);
    }
});

module.exports = strategy;