const express = require('express');
const { Application } = require('../db/Application');

const router = express.Router();

router.post('/', (req, res) => {
  const { job_id: jobID, application_statement: applicationStatement } = req.query;
  if (!req.user.id) return res.send({ error: 'Not logged in.' });
  if (!jobID && !applicationStatement) return res.send({ error: 'Missing required fields.' });

  Application.apply(req.user.id, jobID, applicationStatement)
    .then(() => res.send({ success: true }))
    .catch((error) => res.send({ error: error.message }));
});

router.get('/project', (req, res) => {
  const { project_id: projectID } = req.query;
  if (!req.user) return res.send({ error: 'Not logged in.' });
  if (!projectID) return res.send({ error: "Missing project_id" });

  req.user.fetchProjectIDs()
    .then((authorizedProjectIDs) => {
      if (!authorizedProjectIDs.includes(projectID)) return res.send({ error: 'User does not have access to project.' });
      return Application.getAllApplicationsForProject(projectID);
    })
    .then((applications) => res.send(applications))
    .catch((error) => res.send({ error: error.message }));
});

router.get('/user', (req, res) => {
    if (!req.user) return res.send({ error: 'Not logged in.' });

    req.user.getAllApplications(req.user.id)
        .then((applications) => res.send(applications))
        .catch((error) => res.send({ error: error.message }));
});

module.exports = router;
