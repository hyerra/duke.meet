const express = require('express');
const { Job } = require('../db/Job');
const { JobRequires } = require('../db/JobRequires');

const router = express.Router();

router.post('/', (req, res) => {
  let {
    project_id: projectID, title, payment, time_commitment: timeCommitment,
  } = req.body;
  if (!req.user) return res.status(401).send({ error: 'Not logged in.' });
  if (!projectID || !title || !payment || !timeCommitment) return res.status(400).send({ error: 'Missing one of the required fields.' });

  projectID = parseInt(projectID, 10);

  req.user.fetchProjectIDs()
    .then((authorizedProjectIDs) => {
      if (!authorizedProjectIDs.includes(projectID)) return res.status(403).send({ error: 'User does not have access to project.' });
      return Job.createJobListing(projectID, title, payment, timeCommitment);
    })
    .then((id) => res.send({ id }))
    .catch((error) => res.status(500).send({ error: error.message }));
});

router.put('/', (req, res) => {
  let {
    id, title, payment, time_commitment: timeCommitment,
  } = req.body;
  if (!req.user) return res.status(401).send({ error: 'Not logged in.' });
  if (!id || !title || !payment || !timeCommitment) return res.status(400).send({ error: 'Missing one of the required fields.' });

  id = parseInt(id, 10);

  const existingJob = new Job(undefined, id);
  existingJob.fetchDetails()
    .then(() => req.user.fetchProjectIDs())
    .then((authorizedProjectIDs) => {
      if (!authorizedProjectIDs.includes(existingJob.projectID)) return res.status(403).send({ error: 'User does not have access to project.' });
      const job = new Job(existingJob.projectID, id, title, payment, timeCommitment);
      return job.update();
    })
    .then(() => res.send({ success: true }))
    .catch((error) => res.status(500).send({ error: error.message }));
});

router.post('/skills', (req, res) => {
  const { skills, job_id: jobID } = req.body;
  if (!req.user) return res.status(401).send({ error: 'Not logged in.' });
  if (!skills || !jobID) return res.status(400).send({ error: 'Missing required fields.' });

  const requirements = skills.map((skill) => new JobRequires(jobID, skill));

  const job = new Job(undefined, jobID);
  job.fetchDetails()
    .then(() => req.user.fetchProjectIDs())
    .then((authorizedProjectIDs) => {
      if (!authorizedProjectIDs.includes(job.projectID)) return res.status(403).send({ error: 'User does not have access to modify this job.' });
      return JobRequires.clearSkillsForJob(jobID);
    })
    .then(() => JobRequires.setSkillsForJob(requirements))
    .then(() => res.send({ success: true }))
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

router.get('/project', (req, res) => {
  const { project_id: projectID } = req.query;
  if (!projectID) return res.status(400).send({ error: 'Missing one of the required fields' });

  Job.getJobs(projectID)
    .then((jobs) => res.send(jobs))
    .catch((error) => res.status(500).send({ error: error.message }));
});

router.get('/details', (req, res) => {
  const { job_id: jobID } = req.query;
  if (!jobID) return res.status(400).send({ error: 'Missing one of the required fields.' });

  const job = new Job(jobID);
  job.fetchDetails()
    .then(() => res.send(job))
    .catch((error) => res.status(500).send({ error: error.message }));
});

router.get('/skills', (req, res) => {
  const { job_id: jobID } = req.query;
  if (!jobID) return res.status(400).send({ error: 'Missing one of the required fields.' });

  JobRequires.fetchSkillsForJob(jobID)
    .then((requirements) => {
      const skills = requirements.map((requirement) => requirement.skillID);
      return res.send(skills);
    })
    .catch((error) => res.status(500).send({ error: error.message }));
});

module.exports = router;
