const express = require('express');
const { Job } = require('./../db/Job');

const router = express.Router();

router.post('/', (req, res) => {
    const projectID = req.query.project_id;
    const title = req.query.title;
    const payment = req.query.payment;
    const timeCommitment = req.query.time_commitment;

    if (!projectID || !title || !payment || !timeCommitment) return res.send({ error: 'Missing one of the required fields.'} );

    Job.createJobListing(projectID, title, payment, timeCommitment).then(() => {
        res.send({ success: true });
    }).catch(error => {
        res.send({ error });
    })
});

router.get('/', (req, res) => {
    const projectID = req.query.project_id;

    if (!projectID) return res.send({ error: 'Missing one of the required fields.'} );
    
    Job.getJobs(projectID).then(jobs => {
        res.send(jobs);
    }).catch(error => {
        res.send({ error });
    })
});

module.exports = router;