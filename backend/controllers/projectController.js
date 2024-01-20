const Projects = require('../models/project');

const projectsController = {
  getAllProjects: (req, res) => {
    Projects.getAllProjects(results => {
      res.json(results);
    });
  },

  addProject: (req, res) => {
    const { code, name, score, teacher_id, student_id } = req.body;

    Projects.addProject(code, name, score, teacher_id, student_id, results => {
      res.json(results);
    });
  },

  updateProject: (req, res) => {
    const projectId = req.params.id;
    const { code, name, score, teacher_id, student_id } = req.body;

    Projects.updateProject(
      projectId,
      code,
      name,
      score,
      teacher_id,
      student_id,
      results => {
        res.json(results);
      }
    );
  },

  deleteProject: (req, res) => {
    const projectId = req.params.id;
    Projects.deleteProject(projectId, results => {
      res.json(results);
    });
  }
};

module.exports = projectsController;