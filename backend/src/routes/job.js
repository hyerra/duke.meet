const express = require('express');
const { Job } = require('../db/Job');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    project_id: projectID, title, payment, time_commitment: timeCommitment,
  } = req.query;
  if (!req.user) return res.send({ error: 'Not logged in.' });
  if (!projectID || !title || !payment || !timeCommitment) return res.send({ error: 'Missing one of the required fields.' });

  req.user.fetchProjectIDs()
    .then((authorizedProjectIDs) => {
      if (!authorizedProjectIDs.includes(projectID)) return res.send({ error: 'User does not have access to project.' });
      return Job.createJobListing(projectID, title, payment, timeCommitment);
    })
    .then(() => res.send({ success: true }))
    .catch((error) => res.send({ error: error.message }));
});

router.get('/', (req, res) => {
  const { project_id: projectID } = req.query;
  if (!projectID) return res.send({ error: 'Missing one of the required fields.' });

  Job.getJobs(projectID)
    .then((jobs) => res.send(jobs))
    .catch((error) => res.send({ error: error.message }));
});

module.exports = router;
