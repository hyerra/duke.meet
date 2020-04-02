const express = require('express');
const { Application } = require('./../db/Application');

const router = express.Router();

router.post('/', (req, res) => {
    const userID = req.query.userID;
    const jobID = req.query.jobID;

    if (!userID || !jobID) return res.send({ error: 'Missing userID or jobID.' });

    Application.apply(userID, jobID).then(() => {
        res.send({ success: true })
    }).catch(error => {
        res.send({ error })
    });
});

router.get('/', (req, res) => {
    const projectID = req.query.projectID;
    Application.getAllApplications(projectID).then(applications => {
        res.send(applications);
    }).catch(error => {
        res.send({ error })
    });
});

module.exports = router;