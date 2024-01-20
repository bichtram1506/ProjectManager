const Teachers = require('../models/teacher');

const teachersController = {
  getAllTeachers: (req, res) => {
    Teachers.getAllTeachers(results => {
      res.json(results);
    });
  },

  addTeacher: (req, res) => {
    const { name, email, specialization_id } = req.body;

    Teachers.addTeacher(name, email, specialization_id, results => {
      res.json(results);
    });
  },

  updateTeacher: (req, res) => {
    const teacherId = req.params.id;
    const { name, email, specialization_id } = req.body;

    Teachers.updateTeacher(teacherId, name, email, specialization_id, results => {
      res.json(results);
    });
  },

  deleteTeacher: (req, res) => {
    const teacherId = req.params.id;
    Teachers.deleteTeacher(teacherId, results => {
      res.json(results);
    });
  }
};

module.exports = teachersController;