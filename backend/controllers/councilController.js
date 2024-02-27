const Council = require('../models/council');

const councilController = {
  getAllCouncils: (req, res) => {
    Council.getAllCouncils(results => {
      res.json(results);
    });
  },

  addCouncil: (req, res) => {
    const { title, chairman, secretary, member, examiner } = req.body;
    Council.addCouncil(title, chairman, secretary, member, examiner, results => {
      res.json(results);
    });
  },

  updateCouncil: (req, res) => {
    const councilId = req.params.id;
    const { title, chairman, secretary, member, examiner } = req.body;
    Council.updateCouncil(councilId, title, chairman, secretary, member, examiner, results => {
      res.json(results);
    });
  },

  deleteCouncil: (req, res) => {
    const councilId = req.params.id;
    Council.deleteCouncil(councilId, results => {
      res.json(results);
    });
  }
};

module.exports = councilController;
