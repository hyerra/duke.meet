const express = require('express');
const { User } = require('./../db/User');

const router = express.Router();

router.post('/', (req, res) => {
    const email = req.query.email;
    const year = req.query.year;
    const major = req.query.major;

    if (!email, !year, !major) return res.send({ error: 'Missing required fields.' });
    User.register(email, year, major).then(() => {
        res.send({ success: true });
    }).catch(error => {
        res.send({ error: error.message });
    })
});

router.get('/', (req, res) => {
    const id = req.query.id;
    const email = req.query.email;

    if (id) {
        const user = new User(id);
        user.fetchDetails().then(() => {
            res.send(user);
        }).catch(error => {
            res.send({ error: error.message });
        });
    } else if (email) {
        User.login(email).then(id => {
            res.send(id);
        }).catch(error => {
            res.send({ error: error.message });
        });
    } else {
        res.send({ error: 'Missing id or email.' });
    }
});

module.exports = router;