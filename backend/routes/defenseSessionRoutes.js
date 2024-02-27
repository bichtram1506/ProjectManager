const express = require('express');
const router = express.Router();
const defenseSessionController = require('../controllers/defenseSessionController');

// GET /defense_sessions - Lấy danh sách tất cả các đợt bảo vệ
router.get('/', (req, res) => {
  defenseSessionController.getAllDefenseSessions(req, res);
});

// POST /defense_sessions/add - Thêm một đợt bảo vệ mới
router.post('/add', (req, res) => {
  defenseSessionController.addDefenseSession(req, res);
});

// DELETE /defense_sessions/:id - Xóa một đợt bảo vệ theo ID
router.delete('/:id', (req, res) => {
  defenseSessionController.deleteDefenseSession(req, res);
});

// PUT /defense_sessions/:id - Sửa một đợt bảo vệ theo ID
router.put('/:id', (req, res) => {
  defenseSessionController.updateDefenseSession(req, res);
});

module.exports = router;
