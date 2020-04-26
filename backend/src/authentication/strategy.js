const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../db/User');

const strategy = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.login(email);
    const hashPassword = await user.fetchHashPassword();
    await user.fetchDetails();
    const match = await bcrypt.compare(password, hashPassword);
    match ? done(null, user) : done(new Error('No user'));
  } catch (error) {
    return done(error);
  }
});

module.exports = strategy;
