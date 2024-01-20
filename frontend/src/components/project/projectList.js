import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectCode, setNewProjectCode] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectScore, setNewProjectScore] = useState('');
  const [newTeacherId, setNewTeacherId] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [editProjectId, setEditProjectId] = useState('');
  const [editProjectCode, setEditProjectCode] = useState('');
  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectScore, setEditProjectScore] = useState('');
  const [editTeacherId, setEditTeacherId] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [teachers, setTeachers] = useState([]); // Assuming there is a state for teachers
  const [students, setStudents] = useState([]); // Assuming there is a state for students
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchProjects = () => {
    axios
      .get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchTeachers = () => {
    axios
      .get('/teachers') // Assuming there is a route for fetching teachers
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchStudents = () => {
    axios
      .get('/students') // Assuming there is a route for fetching students
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addProject = () => {
    axios
      .post('/projects/add', {
        code: newProjectCode,
        name: newProjectName,
        score: newProjectScore,
        teacher_id: newTeacherId,
        student_id: newStudentId,
      })
      .then(() => {
        setNewProjectCode('');
        setNewProjectName('');
        setNewProjectScore('');
        setNewTeacherId('');
        setNewStudentId('');
        fetchProjects();
        closeAddModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteProject = projectId => {
    axios
      .delete(`/projects/${projectId}`)
      .then(() => {
        fetchProjects();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editProject = projectId => {
    setEditProjectId(projectId);
    const selectedProject = projects.find(proj => proj.id === projectId);
    if (selectedProject) {
      setEditProjectCode(selectedProject.code);
      setEditProjectName(selectedProject.name);
      setEditProjectScore(selectedProject.score);
      setEditTeacherId(selectedProject.teacher_id);
      setEditStudentId(selectedProject.student_id);
      openEditModal();
    }
  };

  const saveProject = () => {
    axios
      .put(`/projects/${editProjectId}`, {
        code: editProjectCode,
        name: editProjectName,
        score: editProjectScore,
        teacher_id: editTeacherId,
        student_id: editStudentId,
      })
      .then(() => {
        setEditProjectId('');
        setEditProjectCode('');
        setEditProjectName('');
        setEditProjectScore('');
        setEditTeacherId('');
        setEditStudentId('');
        fetchProjects();
        closeEditModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const isFormValid = () => {
    return (
      newProjectCode.trim() !== '' &&
      newProjectName.trim() !== '' &&
      newProjectScore.trim() !== '' &&
      newTeacherId !== '' &&
      newStudentId !== ''
    );
  };

  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm mới đồ án</h2>
          <div className="form-group">
            <label>Mã đồ án:</label>
            <input
              type="text"
              value={newProjectCode}
              onChange={(e) => setNewProjectCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tên đồ án:</label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Điểm số:</label>
            <input
              type="text"
              value={newProjectScore}
              onChange={(e) => setNewProjectScore(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Giáo viên hướng dẫn:</label>
            <select
              value={newTeacherId}
              onChange={(e) => setNewTeacherId(e.target.value)}
            >
              <option value="">Chọn giáo viên</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Sinh viên thực hiện:</label>
            <select
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
            >
              <option value="">Chọn sinh viên</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addProject} className="save-button" disabled={!isFormValid()}>
            Lưu
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Đóng
          </button>
        </div>
      </Modal>

      <h2>Danh sách đồ án</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
        Thêm mới
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Mã đồ án</th>
            <th>Tên đồ án</th>
            <th>Điểm số</th>
            <th>Giáo viên hướng dẫn</th>
            <th>Sinh viên thực hiện</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.code}</td>
              <td>{project.name}</td>
              <td>{project.score}</td>
              <td>{teachers.find(teacher => teacher.id === project.teacher_id)?.name}</td>
              <td>{students.find(student => student.id === project.student_id)?.name}</td>
              <td>
                <button className="edit-button" onClick={() => editProject(project.id)}>
                  Sửa
                </button>
                <button className="delete-button" onClick={() => deleteProject(project.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProjectId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Chỉnh sửa đồ án</h2>
            <div className="form-group">
              <label>Mã đồ án:</label>
              <input
                type="text"
                value={editProjectCode}
                onChange={(e) => setEditProjectCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tên đồ án:</label>
              <input
                type="text"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Điểm số:</label>
              <input
                type="text"
                value={editProjectScore}
                onChange={(e) => setEditProjectScore(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Giáo viên hướng dẫn:</label>
              <select
                value={editTeacherId}
                onChange={(e) => setEditTeacherId(e.target.value)}
              >
                <option value="">Chọn giáo viên</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Sinh viên thực hiện:</label>
              <select
                value={editStudentId}
                onChange={(e) => setEditStudentId(e.target.value)}
              >
                <option value="">Chọn sinh viên</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={saveProject} className="save-button">
              Lưu
            </button>
            <button onClick={closeEditModal} className="cancel-button">
              Đóng
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectList;
