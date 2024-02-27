import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicStatus, setNewTopicStatus] = useState('');
  const [editTopicId, setEditTopicId] = useState('');
  const [editTopicTitle, setEditTopicTitle] = useState('');
  const [editTopicDescription, setEditTopicDescription] = useState('');
  const [editTopicStatus, setEditTopicStatus] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    axios
      .get('/topics')
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTopic = () => {
    axios
      .post('/topics/add', {
        title: newTopicTitle,
        description: newTopicDescription,
        status: newTopicStatus,
      })
      .then(() => {
        setNewTopicTitle('');
        setNewTopicDescription('');
        setNewTopicStatus('');
        fetchTopics();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTopic = (topicId) => {
    axios
      .delete(`/topics/${topicId}`)
      .then(() => {
        fetchTopics();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTopic = (topicId) => {
    setEditTopicId(topicId);
    const selectedTopic = topics.find((topic) => topic.id === topicId);
    if (selectedTopic) {
      setEditTopicTitle(selectedTopic.title);
      setEditTopicDescription(selectedTopic.description);
      setEditTopicStatus(selectedTopic.status);
      openEditModal();
    }
  };

  const saveTopic = () => {
    axios
      .put(`/topics/${editTopicId}`, {
        title: editTopicTitle,
        description: editTopicDescription,
        status: editTopicStatus,
      })
      .then(() => {
        setEditTopicId('');
        setEditTopicTitle('');
        setEditTopicDescription('');
        setEditTopicStatus('');
        fetchTopics();
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
      newTopicTitle.trim() !== '' &&
      newTopicDescription.trim() !== '' &&
      newTopicStatus.trim() !== ''
    );
  };
  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return 'Đang chờ xử lý';
      case '1':
        return 'Được phê duyệt';
      case '2':
        return 'Bị từ chối';
      default:
        return 'Không xác định';
    }
  };
  
  
  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Thêm đề tài</h2>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <input
              type="text"
              value={newTopicDescription}
              onChange={(e) => setNewTopicDescription(e.target.value)}
            />
          </div>
      
          <button onClick={addTopic} className="save-button" disabled={!isFormValid()}>
            Save
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>

      <h2>Danh sách đề tài</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
        Thêm mới
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>{topic.title}</td>
              <td>{topic.description}</td>
              <td>{getStatusText(topic.status.toString())}</td>

              <td>
                <button className="edit-button" onClick={() => editTopic(topic.id)}>
                  Sửa
                </button>
                <button className="delete-button" onClick={() => deleteTopic(topic.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTopicId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Chỉnh sửa đề tài</h2>
            <div className="form-group">
              <label htmlFor="topicTitle">Tiêu đề:</label>
              <input
                type="text"
                id="topicTitle"
                value={editTopicTitle}
                onChange={(e) => setEditTopicTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="topicDescription">Mô tả:</label>
              <input
                type="text"
                id="topicDescription"
                value={editTopicDescription}
                onChange={(e) => setEditTopicDescription(e.target.value)}
              />
            </div>
            <select
                value={editTopicStatus}
                onChange={(e) => setEditTopicStatus(e.target.value)}
                >
                <option value="0">Đang chờ xử lý</option>
                <option value="1">Được phê duyệt</option>
                <option value="2">Bị từ chối</option>
            </select>
            <button onClick={saveTopic} className="save-button">
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

export default TopicList;
