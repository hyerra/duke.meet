const express = require('express');
const passport = require('passport');
const { User } = require('./../db/User');

const router = express.Router();

router.post('/', (req, res) => {
    const email = req.query.email;
    const year = req.query.year;
    const major = req.query.major;
    const password = req.query.password;

    if (!email, !year, !major) return res.send({ error: 'Missing required fields.' });
    User.register(email, year, major, password)
        .then(() => res.send({ success: true }))
        .catch(error => res.send({ error: error.message }));
});

router.get('/', (req, res) => {
    const id = req.query.id;

    if (id) {
        const user = new User(id);
        user.fetchDetails()
            .then(() => res.send(user))
            .catch(error => res.send({ error: error.message }));
    } else {
        if (req.user) res.send(req.user);
        res.send({ error: 'Missing id or email.' });
    }
});

module.exports = router;