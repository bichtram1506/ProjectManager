import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DefenseSessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionStartDate, setNewSessionStartDate] = useState(null);
  const [newSessionEndDate, setNewSessionEndDate] = useState(null);
  const [newSessionDescription, setNewSessionDescription] = useState('');
  const [editSessionId, setEditSessionId] = useState('');
  const [editSessionName, setEditSessionName] = useState('');
  const [editSessionStartDate, setEditSessionStartDate] = useState(null);
  const [editSessionEndDate, setEditSessionEndDate] = useState(null);
  const [editSessionDescription, setEditSessionDescription] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    axios
      .get('/defense_sessions')
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addSession = () => {
    axios
      .post('/defense_sessions/add', {
        name: newSessionName,
        start_date: newSessionStartDate,
        end_date: newSessionEndDate,
        description: newSessionDescription,
      })
      .then(() => {
        setNewSessionName('');
        setNewSessionStartDate(null);
        setNewSessionEndDate(null);
        setNewSessionDescription('');
        fetchSessions();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSession = (sessionId) => {
    axios
      .delete(`/defense_sessions/${sessionId}`)
      .then(() => {
        fetchSessions();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editSession = (sessionId) => {
    setEditSessionId(sessionId);
    const selectedSession = sessions.find((session) => session.id === sessionId);
    if (selectedSession) {
      setEditSessionName(selectedSession.name);
      setEditSessionStartDate(new Date(selectedSession.start_date));
      setEditSessionEndDate(new Date(selectedSession.end_date));
      setEditSessionDescription(selectedSession.description);
      openEditModal();
    }
  };

  const saveSession = () => {
    axios
      .put(`/defense_sessions/${editSessionId}`, {
        name: editSessionName,
        start_date: editSessionStartDate,
        end_date: editSessionEndDate,
        description: editSessionDescription,
      })
      .then(() => {
        setEditSessionId('');
        setEditSessionName('');
        setEditSessionStartDate(null);
        setEditSessionEndDate(null);
        setEditSessionDescription('');
        fetchSessions();
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
      newSessionName.trim() !== '' &&
      newSessionStartDate !== null &&
      newSessionEndDate !== null &&
      newSessionDescription.trim() !== ''
    );
  };

  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm Đợt đồ án</h2>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Ngày bắt đầu:</label>
            <DatePicker
              selected={newSessionStartDate} // Giá trị ngày bắt đầu
              onChange={(date) => setNewSessionStartDate(date)} // Hàm xử lý khi thay đổi ngày
              dateFormat="yyyy-MM-dd" // Định dạng ngày
            />
          </div>
          <div className="form-group">
            <label>Ngày kết thúc:</label>
            <DatePicker
              selected={newSessionEndDate} // Giá trị ngày kết thúc
              onChange={(date) => setNewSessionEndDate(date)} // Hàm xử lý khi thay đổi ngày
              dateFormat="yyyy-MM-dd" // Định dạng ngày
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <input
              type="text"
              value={newSessionDescription}
              onChange={(e) => setNewSessionDescription(e.target.value)}
            />
          </div>
          <button onClick={addSession} className="save-button" disabled={!isFormValid()}>
            Save
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>

      <h2>Quản lý đợt đồ án</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
       Thêm đợt đồ án
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.name}</td>
              <td>{format(new Date(session.start_date), 'dd/MM/yyyy')}</td>
              <td>{format(new Date(session.end_date), 'dd/MM/yyyy')}</td>
              <td>{session.description}</td>
              <td>
                <button className="edit-button" onClick={() => editSession(session.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteSession(session.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editSessionId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Đợt đồ án</h2>
            <div className="form-group">
            <label>Tiêu đề:</label>
              <input
                type="text"
                value={editSessionName}
                onChange={(e) => setEditSessionName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ngày bắt đầu:</label>
              <DatePicker
                selected={editSessionStartDate} // Giá trị ngày bắt đầu
                onChange={(date) => setEditSessionStartDate(date)} // Hàm xử lý khi thay đổi ngày
                dateFormat="yyyy-MM-dd" // Định dạng ngày
              />
            </div>
            <div className="form-group">
              <label>Ngày kết thúc:</label>
              <DatePicker
                selected={editSessionEndDate} // Giá trị ngày kết thúc
                onChange={(date) => setEditSessionEndDate(date)} // Hàm xử lý khi thay đổi ngày
                dateFormat="yyyy-MM-dd" // Định dạng ngày
              />
            </div>
            <div className="form-group">
              <label>Mô tả:</label>
              <input
                type="text"
                value={editSessionDescription}
                onChange={(e) => setEditSessionDescription(e.target.value)}
              />
            </div>
            <button onClick={saveSession} className="save-button">
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

export default DefenseSessionList;
