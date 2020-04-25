const express = require('express');
const { Project } = require('./../db/Project');

const router = express.Router();

router.get('/', (req, res) => {
    const id = req.query.id;
    if (!id) {
        Project.getAllProjects()
            .then(projects => res.send(projects))
            .catch(error => res.send({ error: error.message }));
    } else {
        const project = new Project(id);
        project.fetchDetails()
            .then(() => res.send(project))
            .catch(error => res.send({ error: error.message }));
    }
});

router.post('/', (req, res) => {
    const title = req.query.title;
    const description = req.query.description;

    if (!req.user.id) return res.send({ error: 'Not logged in.' });
    if (!title || !description) return res.send({ error: 'Missing required fields.' });

    Project.createProject(req.user.id, title, description)
        .then(() => res.send({ success: true }))
        .catch(error => res.send({ error: error.message }));
});

module.exports = router;