const connection = require('../configs/db');

class Council {
  static getAllCouncils(callback) {
    const query = 'SELECT * FROM councils';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addCouncil(title, chairman, secretary, member, examiner, callback) {
    const query = 'INSERT INTO councils (title, chairman, secretary, member, examiner) VALUES (?, ?, ?, ?, ?)';
    connection.query(
      query,
      [title, chairman, secretary, member, examiner],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateCouncil(id, title, chairman, secretary, member, examiner, callback) {
    const query = 'UPDATE councils SET title = ?, chairman = ?, secretary = ?, member = ?, examiner = ? WHERE id = ?';
    connection.query(
      query,
      [title, chairman, secretary, member, examiner, id],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteCouncil(id, callback) {
    const query = 'DELETE FROM councils WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Council;
