const DefenseSession = require('../models/defenseSession');

const defenseSessionController = {
  getAllDefenseSessions: (req, res) => {
    DefenseSession.getAllDefenseSessions(results => {
      res.json(results);
    });
  },

  addDefenseSession: (req, res) => {
    const { name, start_date, end_date, description } = req.body;
    DefenseSession.addDefenseSession(name, start_date, end_date, description, results => {
      res.json(results);
    });
  },

  updateDefenseSession: (req, res) => {
    const defenseSessionId = req.params.id;
    const { name, start_date, end_date, description } = req.body;
    DefenseSession.updateDefenseSession(defenseSessionId, name, start_date, end_date, description, results => {
      res.json(results);
    });
  },

  deleteDefenseSession: (req, res) => {
    const defenseSessionId = req.params.id;
    DefenseSession.deleteDefenseSession(defenseSessionId, results => {
      res.json(results);
    });
  }
};

module.exports = defenseSessionController;
