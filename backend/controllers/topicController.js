const Topic = require('../models/topic');

const topicController = {
  getAllTopics: (req, res) => {
    Topic.getAllTopics(results => {
      res.json(results);
    });
  },

  addTopic: (req, res) => {
    const { title, description, status } = req.body;
    Topic.addTopic(title, description, status, results => {
      res.json(results);
    });
  },

  updateTopic: (req, res) => {
    const topicId = req.params.id;
    const { title, description, status } = req.body;
    Topic.updateTopic(topicId, title, description, status, results => {
      res.json(results);
    });
  },

  deleteTopic: (req, res) => {
    const topicId = req.params.id;
    Topic.deleteTopic(topicId, results => {
      res.json(results);
    });
  }
};

module.exports = topicController;
