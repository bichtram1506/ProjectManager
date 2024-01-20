import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newClassId, setNewClassId] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentEmail, setEditStudentEmail] = useState('');
  const [editClassId, setEditClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = () => {
    axios
      .get('/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchClasses = () => {
    axios
      .get('/classes')
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addStudent = () => {
    axios
      .post('/students/add', {
        name: newStudentName,
        email: newStudentEmail,
        class_id: newClassId,
      })
      .then(() => {
        setNewStudentName('');
        setNewStudentEmail('');
        setNewClassId('');
        fetchStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteStudent = (studentId) => {
    axios
      .delete(`/students/${studentId}`)
      .then(() => {
        fetchStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editStudent = (studentId) => {
    setEditStudentId(studentId);
    const selectedStudent = students.find((student) => student.id === studentId);
    if (selectedStudent) {
      setEditStudentName(selectedStudent.name);
      setEditStudentEmail(selectedStudent.email);
      setEditClassId(selectedStudent.class_id);
      openEditModal();
    }
  };

  const saveStudent = () => {
    axios
      .put(`/students/${editStudentId}`, {
        name: editStudentName,
        email: editStudentEmail,
        class_id: editClassId,
      })
      .then(() => {
        setEditStudentId('');
        setEditStudentName('');
        setEditStudentEmail('');
        setEditClassId('');
        fetchStudents();
      })
      .catch((error) => {
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
      newStudentName.trim() !== '' &&
      newStudentEmail.trim() !== '' &&
      newClassId !== ''
    );
  };

  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm sinh viên</h2>
          <div className="form-group">
            <label>Tên:</label>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Lớp:</label>
            <select
              value={newClassId}
              onChange={(e) => setNewClassId(e.target.value)}
            >
              <option value="">Select class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addStudent} className="save-button" disabled={!isFormValid()}>
            Save
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>

      <h2>Danh sách sinh viên</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
       Thêm mới
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Lớp</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{classes.find((cls) => cls.id === student.class_id)?.name}</td>
              <td>
                <button className="edit-button" onClick={() => editStudent(student.id)}>
                  Sửa
                </button>
                <button className="delete-button" onClick={() => deleteStudent(student.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editStudentId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Chỉnh sửa sinh viên</h2>
            <div className="form-group">
              <label htmlFor="studentName">Tên:</label>
              <input
                type="text"
                id="studentName"
                value={editStudentName}
                onChange={(e) => setEditStudentName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentEmail">Email:</label>
              <input
                type="text"
                id="studentEmail"
                value={editStudentEmail}
                onChange={(e) => setEditStudentEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editClass">Lớp:</label>
              <select
                id="editClass"
                value={editClassId}
                onChange={(e) => setEditClassId(e.target.value)}
              >
                <option value="">Chọn lớp</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={saveStudent} className="save-button">
              Save
            </button>
            <button onClick={closeEditModal} className="cancel-button">
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentList;
