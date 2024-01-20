const connection = require('../configs/db');

class Projects {
  static getAllProjects(callback) {
    const query = 'SELECT * FROM projects';
    connection.query(query, (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }

  static addProject(code, name, score, teacherId, studentId, callback) {
    const query =
      'INSERT INTO projects (code, name, score, teacher_id, student_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(
      query,
      [code, name, score, teacherId, studentId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static updateProject(projectId, code, name, score, teacherId, studentId, callback) {
    const query =
      'UPDATE projects SET code = ?, name = ?, score = ?, teacher_id = ?, student_id = ? WHERE id = ?';
    connection.query(
      query,
      [code, name, score, teacherId, studentId, projectId],
      (error, results) => {
        if (error) throw error;
        callback(results);
      }
    );
  }

  static deleteProject(projectId, callback) {
    const query = 'DELETE FROM projects WHERE id = ?';
    connection.query(query, [projectId], (error, results) => {
      if (error) throw error;
      callback(results);
    });
  }
}

module.exports = Projects;