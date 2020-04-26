const express = require('express');
const { Project } = require('../db/Project');

const router = express.Router();

router.get('/', (req, res) => {
  const { id } = req.query;
  if (!id) {
    Project.getAllProjects()
      .then((projects) => res.send(projects))
      .catch((error) => res.status(500).send({ error: error.message }));
  } else {
    const project = new Project(id);
    project.fetchDetails()
      .then(() => res.send(project))
      .catch((error) => res.status(500).send({ error: error.message }));
  }
});

router.put('/', (req, res) => {
  const { id, title, description } = req.body;
  if (!id || !title || !description) return res.status(400).send({ error: 'Missing required fields.' });

  const project = new Project(id, title, description);
  project.update()
      .then(() => res.send({success: true}))
      .catch(error => res.status(500).send({ error: error.message }));
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!req.user.id) return res.status(401).send({ error: 'Not logged in.' });
  if (!title || !description) return res.status(400).send({ error: 'Missing required fields.' });

  Project.createProject(req.user.id, title, description)
    .then(() => res.send({ success: true }))
    .catch((error) => res.status(500).send({ error: error.message }));
});

module.exports = router;
