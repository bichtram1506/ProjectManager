const Students = require('../models/student');

const studentsController = {
  getAllStudents: (req, res) => {
    Students.getAllStudents(results => {
      res.json(results);
    });
  },

  addStudent: (req, res) => {
    const { name, email, class_id } = req.body;

    Students.addStudent(name, email, class_id, results => {
      res.json(results);
    });
  },

  updateStudent: (req, res) => {
    const studentId = req.params.id;
    const { name, email, class_id } = req.body;

    Students.updateStudent(studentId, name, email, class_id, results => {
      res.json(results);
    });
  },

  deleteStudent: (req, res) => {
    const studentId = req.params.id;
    Students.deleteStudent(studentId, results => {
      res.json(results);
    });
  }
};

module.exports = studentsController;