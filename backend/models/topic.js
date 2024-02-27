const connection = require('../configs/db');

class Topic {
  static getAllTopics(callback) {
    const query = 'SELECT * FROM topics';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addTopic(title, description, status, callback) {
    const query = 'INSERT INTO topics (title, description, status) VALUES (?, ?, ?)';
    connection.query(
      query,
      [title, description, status],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateTopic(id, title, description, status, callback) {
    const query = 'UPDATE topics SET title = ?, description = ?, status = ? WHERE id = ?';
    connection.query(
      query,
      [title, description, status, id],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteTopic(id, callback) {
    const query = 'DELETE FROM topics WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Topic;
