const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teacherController');

// GET /teachers - Lấy danh sách tất cả giảng viên
router.get('/', (req, res) => {
  teachersController.getAllTeachers(req, res);
});

// POST /teachers/add - Thêm một giảng viên mới
router.post('/add', (req, res) => {
  teachersController.addTeacher(req, res);
});

// DELETE /teachers/:id - Xóa một giảng viên theo ID
router.delete('/:id', (req, res) => {
  teachersController.deleteTeacher(req, res);
});

// PUT /teachers/:id - Sửa một giảng viên theo ID
router.put('/:id', (req, res) => {
  teachersController.updateTeacher(req, res);
});

module.exports = router;