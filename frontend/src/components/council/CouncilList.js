import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const CouncilList = () => {
  const [councils, setCouncils] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newCouncilTitle, setNewCouncilTitle] = useState('');
  const [chairmanId, setChairmanId] = useState('');
  const [secretaryId, setSecretaryId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [examinerId, setExaminerId] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCouncilId, setEditCouncilId] = useState('');
  const [editCouncilTitle, setEditCouncilTitle] = useState('');
  const [editChairmanId, setEditChairmanId] = useState('');
  const [editSecretaryId, setEditSecretaryId] = useState('');
  const [editMemberId, setEditMemberId] = useState('');
  const [editExaminerId, setEditExaminerId] = useState('');

  useEffect(() => {
    fetchCouncils();
    fetchTeachers();
  }, []);

  const fetchCouncils = () => {
    axios
      .get('/councils')
      .then((response) => {
        setCouncils(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTeachers = () => {
    axios
      .get('/teachers') // Assuming there is a route for fetching teachers
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addCouncil = () => {
    axios
      .post('/councils/add', {
        title: newCouncilTitle,
        chairman: chairmanId,
        secretary: secretaryId,
        member: memberId,
        examiner: examinerId,
      })
      .then(() => {
        setNewCouncilTitle('');
        setChairmanId('');
        setSecretaryId('');
        setMemberId('');
        setExaminerId('');
        fetchCouncils();
        closeAddModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCouncil = (councilId) => {
    axios
      .delete(`/councils/${councilId}`)
      .then(() => {
        fetchCouncils();
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

  const openEditModal = (council) => {
    setEditCouncilId(council.id);
    setEditCouncilTitle(council.title);
    setEditChairmanId(council.chairman);
    setEditSecretaryId(council.secretary);
    setEditMemberId(council.member);
    setEditExaminerId(council.examiner);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const isFormValid = () => {
    return (
      newCouncilTitle.trim() !== '' &&
      chairmanId !== '' &&
      secretaryId !== '' &&
      memberId !== '' &&
      examinerId !== ''
    );
  };

  const editCouncil = () => {
    axios
      .put(`/councils/${editCouncilId}`, {
        title: editCouncilTitle,
        chairman: editChairmanId,
        secretary: editSecretaryId,
        member: editMemberId,
        examiner: editExaminerId,
      })
      .then(() => {
        fetchCouncils();
        closeEditModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to get teacher name by ID
  const getTeacherNameById = (teacherId) => {
    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    return teacher ? teacher.name : '';
  };

  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm mới hội đồng</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={newCouncilTitle}
              onChange={(e) => setNewCouncilTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Chairman:</label>
            <select
              value={chairmanId}
              onChange={(e) => setChairmanId(e.target.value)}
            >
              <option value="">Select Chairman</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Secretary:</label>
            <select
              value={secretaryId}
              onChange={(e) => setSecretaryId(e.target.value)}
            >
              <option value="">Select Secretary</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Member:</label>
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            >
              <option value="">Select Member</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Examiner:</label>
            <select
              value={examinerId}
              onChange={(e) => setExaminerId(e.target.value)}
            >
              <option value="">Select Examiner</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addCouncil} className="save-button" disabled={!isFormValid()}>
            Save
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
        <div className="modal-content">
          <h2>Chỉnh sửa hội đồng</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={editCouncilTitle}
              onChange={(e) => setEditCouncilTitle(e.target.value)}
            />
            </div>
            <div className="form-group">
              <label>Chairman:</label>
              <select
                value={editChairmanId}
                onChange={(e) => setEditChairmanId(e.target.value)}
              >
                <option value="">Select Chairman</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Secretary:</label>
              <select
                value={editSecretaryId}
                onChange={(e) => setEditSecretaryId(e.target.value)}
              >
                <option value="">Select Secretary</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Member:</label>
              <select
                value={editMemberId}
                onChange={(e) => setEditMemberId(e.target.value)}
              >
                <option value="">Select Member</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Examiner:</label>
              <select
                value={editExaminerId}
                onChange={(e) => setEditExaminerId(e.target.value)}
              >
                <option value="">Select Examiner</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={editCouncil} className="save-button">
              Save
            </button>
            <button onClick={closeEditModal} className="cancel-button">
              Close
            </button>
          </div>
        </Modal>
  
        <h2>Danh sách hội đồng</h2>
        <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
          Thêm mới
        </button>
        <table className="department-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Chairman</th>
              <th>Secretary</th>
              <th>Member</th>
              <th>Examiner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {councils.map((council) => (
              <tr key={council.id}>
                <td>{council.title}</td>
                <td>{getTeacherNameById(council.chairman)}</td>
                <td>{getTeacherNameById(council.secretary)}</td>
                <td>{getTeacherNameById(council.member)}</td>
                <td>{getTeacherNameById(council.examiner)}</td>
                <td>
                  <button className="edit-button" onClick={() => openEditModal(council)}>
                    Sửa
                  </button>
                  <button className="delete-button" onClick={() => deleteCouncil(council.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CouncilList;
  