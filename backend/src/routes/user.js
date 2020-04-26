const express = require('express');
const { User } = require('../db/User');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    name, email, major, year, password,
  } = req.body;
  if (!name || !email || !major || !year) return res.status(400).send({ error: 'Missing required fields.' });

  User.register(name, email, major, year, password)
    .then(() => res.send({ success: true }))
    .catch((error) => res.status(401).send({ error: error.message }));
});

router.get('/', (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = new User(id);
    user.fetchDetails()
      .then(() => res.send(user))
      .catch((error) => res.send({ error: error.message }));
  } else {
    if (!req.user) return res.status(400).send({ error: 'Missing id or email.' });
    return res.send(req.user);
  }
});

module.exports = router;
