const connection = require('../configs/db');

class Teachers {
  static getAllTeachers(callback) {
    const query = 'SELECT * FROM teachers';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addTeacher(name, email, specializationId, callback) {
    const query =
      'INSERT INTO teachers (name, email, specialization_id) VALUES (?, ?, ?)';
    connection.query(
      query,
      [name, email, specializationId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateTeacher(teacherId, name, email, specializationId, callback) {
    const query =
      'UPDATE teachers SET name = ?, email = ?, specialization_id = ? WHERE id = ?';
    connection.query(
      query,
      [name, email, specializationId, teacherId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteTeacher(teacherId, callback) {
    const query = 'DELETE FROM teachers WHERE id = ?';
    connection.query(query, [teacherId], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Teachers;