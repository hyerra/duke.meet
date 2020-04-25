const express = require('express');
const { Job } = require('../db/Job');
const { JobRequires } = require('../db/JobRequires');

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

router.post('/skills', (req, res) => {
  const { skills, job_id: jobID } = req.query;
  if (!req.user) return res.send({ error: 'Not logged in.' });
  if (!skills || !jobID) return res.send({ error: 'Missing required fields.' });

  const requirements = skills.map(skill => JobRequires(jobID, skill));

  const job = new Job(jobID);
  jobID.fetchDetails()
      .then(() => req.user.fetchProjectIDs())
      .then(authorizedProjectIDs => {
        if (!authorizedProjectIDs.includes(job.projectID)) return res.send({ error: 'User does not have access to modify this job.' })
        return JobRequires.clearSkillsForJob(jobID);
      })
      .then(() => JobRequires.setSkillsForJob(requirements))
      .then(() => res.send({ success: true }))
      .catch((error) => res.send({ error: error.message }));
});

router.get('/project', (req, res) => {
  const { project_id: projectID } = req.query;
  if (!projectID) return res.send({ error: 'Missing one of the required fields' });

  Job.getJobs(projectID)
      .then((jobs) => res.send(jobs))
      .catch((error) => res.send({ error: error.message }));
});

router.get('/details', (req, res) => {
  const { job_id: jobID } = req.query;
  if (!jobID) return res.send({ error: 'Missing one of the required fields.' });

  const job = Job(jobID);
  Job.fetchDetails()
      .then(() => res.send(job))
      .catch((error) => res.send({ error: error.message }));
});

module.exports = router;
