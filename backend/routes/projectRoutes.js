const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectController');

// GET /projects - Get all projects
router.get('/', (req, res) => {
  projectsController.getAllProjects(req, res);
});

// POST /projects - Add a new project
router.post('/add', (req, res) => {
  projectsController.addProject(req, res);
});

// PUT /projects/:id - Update a project by ID
router.put('/:id', (req, res) => {
  projectsController.updateProject(req, res);
});

// DELETE /projects/:id - Delete a project by ID
router.delete('/:id', (req, res) => {
  projectsController.deleteProject(req, res);
});

module.exports = router;