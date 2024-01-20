import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState('');
  const [editTeacherName, setEditTeacherName] = useState('');
  const [editTeacherEmail, setEditTeacherEmail] = useState('');
  const [editTeacherSpecialization, setEditTeacherSpecialization] = useState('');

  useEffect(() => {
    fetchTeachers();
    fetchSpecializations();
  }, []);

  const fetchTeachers = () => {
    axios
      .get('/teachers')
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSpecializations = () => {
    axios
      .get('/specializations')
      .then((response) => {
        setSpecializations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTeacher = () => {
    axios
      .post('/teachers/add', {
        name: newTeacherName,
        email: newTeacherEmail,
        specialization_id: selectedSpecialization,
      })
      .then(() => {
        setNewTeacherName('');
        setNewTeacherEmail('');
        setSelectedSpecialization('');
        fetchTeachers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTeacher = (teacherId) => {
    axios
      .delete(`/teachers/${teacherId}`)
      .then(() => {
        fetchTeachers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTeacher = (teacherId) => {
    setEditTeacherId(teacherId);
    const selectedTeacher = teachers.find((teacher) => teacher.id === teacherId);
    if (selectedTeacher) {
      setEditTeacherName(selectedTeacher.name);
      setEditTeacherEmail(selectedTeacher.email);
      setEditTeacherSpecialization(selectedTeacher.specialization_id); // Use specialization_id for select value
      openEditModal();
    }
  };

  const saveTeacher = () => {
    axios
    .put(`/teachers/${editTeacherId}`, {
      name: editTeacherName,
      email: editTeacherEmail,
      email: editTeacherEmail,
      specialization_id: editTeacherSpecialization, // Use specialization_id for select value
    })
    .then(() => {
      setEditTeacherId('');
      setEditTeacherName('');
      setEditTeacherEmail('');
      setEditTeacherSpecialization('');
      fetchTeachers();
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
    return newTeacherName.trim() !== '' && newTeacherEmail.trim() !== '' && selectedSpecialization !== '';
  };

  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm giảng viên</h2>
          <div className="form-group">
            <label>Tên:</label>
            <input
              type="text"
              value={newTeacherName}
              onChange={(e) => setNewTeacherName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={newTeacherEmail}
              onChange={(e) => setNewTeacherEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Chuyên ngành:</label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="">Chọn chuyên ngành</option>
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addTeacher} className="save-button" disabled={!isFormValid()}>
            Save
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>

      <h2>Danh sách giảng viên</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
        Thêm mới
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Chuyên ngành</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{specializations.find((spec) => spec.id === teacher.specialization_id)?.name}</td>

              <td>
                <button className="edit-button" onClick={() => editTeacher(teacher.id)}>
                  Sửa
                </button>
                <button className="delete-button" onClick={() => deleteTeacher(teacher.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTeacherId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Chỉnh sửa giảng viên</h2>
            <div className="form-group">
              <label htmlFor="teacherName">Tên:</label>
              <input
                type="text"
                id="teacherName"
                value={editTeacherName}
                onChange={(e) => setEditTeacherName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacherEmail">Email:</label>
              <input
                type="text"
                id="teacherEmail"
                value={editTeacherEmail}
                onChange={(e) => setEditTeacherEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label>Chuyên ngành:</label>
            <select
                value={editTeacherSpecialization}
                onChange={(e) => setEditTeacherSpecialization(e.target.value)}
            >
                <option value="">Chọn chuyên ngành</option>
                {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                    {specialization.name}
                </option>
                ))}
            </select>
            </div>
            <button onClick={saveTeacher} className="save-button">
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

export default TeacherList;
