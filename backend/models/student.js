const connection = require('../configs/db');

class Students {
  static getAllStudents(callback) {
    const query = 'SELECT * FROM students';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addStudent(name, email, classId, callback) {
    const query =
      'INSERT INTO students (name, email, class_id) VALUES (?, ?, ?)';
    connection.query(
      query,
      [name, email, classId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateStudent(studentId, name, email, classId, callback) {
    const query =
      'UPDATE students SET name = ?, email = ?, class_id = ? WHERE id = ?';
    connection.query(
      query,
      [name, email, classId, studentId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteStudent(studentId, callback) {
    const query = 'DELETE FROM students WHERE id = ?';
    connection.query(query, [studentId], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Students;