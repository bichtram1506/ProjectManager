const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentController');

// GET /students - Lấy danh sách tất cả sinh viên
router.get('/', (req, res) => {
  studentsController.getAllStudents(req, res);
});

// POST /students/add - Thêm một sinh viên mới
router.post('/add', (req, res) => {
  studentsController.addStudent(req, res);
});

// DELETE /students/:id - Xóa một sinh viên theo ID
router.delete('/:id', (req, res) => {
  studentsController.deleteStudent(req, res);
});

// PUT /students/:id - Sửa một sinh viên theo ID
router.put('/:id', (req, res) => {
  studentsController.updateStudent(req, res);
});

module.exports = router;