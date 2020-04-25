const express = require('express');
const { Skill } = require('../db/Skill');

const router = express.Router();

router.get('/', (req, res) => {
    Skill.getAllSkills()
        .then(skills => res.send(skills))
        .catch(error => res.send({ error: error.message }))
});

module.exports = router;
