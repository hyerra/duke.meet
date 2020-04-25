const express = require('express');
const { Application } = require('./../db/Application');

const router = express.Router();

router.post('/', (req, res) => {
    const jobID = req.query.job_id;
    if (!req.user.id) return res.send({ error: 'Not logged in.' });
    if (!jobID) return res.send({ error: 'Missing job_id.' });

    Application.apply(req.user.id, jobID)
        .then(() => res.send({ success: true }))
        .catch(error => res.send({ error: error.message }));
});

router.get('/', (req, res) => {
    const projectID = req.query.project_id;
    if (!req.user) return res.send({ error: 'Not logged in.' });

    req.user.fetchProjectIDs()
        .then(authorizedProjectIDs => {
            if (!authorizedProjectIDs.includes(projectID)) return res.send({ error: 'User does not have access to project.' });
            return Application.getAllApplications(projectID);
        })
        .then(applications => res.send(applications))
        .catch(error => res.send({ error: error.message }));
});

module.exports = router;