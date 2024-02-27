const express = require('express');
const router = express.Router();
const councilController = require('../controllers/councilController');

// GET /councils - Lấy danh sách tất cả các hội đồng
router.get('/', (req, res) => {
  councilController.getAllCouncils(req, res);
});

// POST /councils/add - Thêm một hội đồng mới
router.post('/add', (req, res) => {
  councilController.addCouncil(req, res);
});

// DELETE /councils/:id - Xóa một hội đồng theo ID
router.delete('/:id', (req, res) => {
  councilController.deleteCouncil(req, res);
});

// PUT /councils/:id - Sửa một hội đồng theo ID
router.put('/:id', (req, res) => {
  councilController.updateCouncil(req, res);
});

module.exports = router;
