const connection = require('../configs/db');

class DefenseSessions {
  static getAllDefenseSessions(callback) {
    const query = 'SELECT * FROM defense_sessions';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addDefenseSession(name, start_date, end_date, description, callback) {
    const query = 'INSERT INTO defense_sessions (name, start_date, end_date, description) VALUES (?, ?, ?, ?)';
    connection.query(
      query,
      [name, start_date, end_date, description],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateDefenseSession(id, name, start_date, end_date, description, callback) {
    const query = 'UPDATE defense_sessions SET name = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?';
    connection.query(
      query,
      [name, start_date, end_date, description, id],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteDefenseSession(id, callback) {
    const query = 'DELETE FROM defense_sessions WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = DefenseSessions;
