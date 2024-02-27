const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// GET /topics - Lấy danh sách tất cả các đề tài
router.get('/', (req, res) => {
  topicController.getAllTopics(req, res);
});

// POST /topics/add - Thêm một đề tài mới
router.post('/add', (req, res) => {
  topicController.addTopic(req, res);
});

// DELETE /topics/:id - Xóa một đề tài theo ID
router.delete('/:id', (req, res) => {
  topicController.deleteTopic(req, res);
});

// PUT /topics/:id - Sửa một đề tài theo ID
router.put('/:id', (req, res) => {
  topicController.updateTopic(req, res);
});

module.exports = router;
