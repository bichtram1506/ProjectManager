import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './assets/css/index.css';
import AcademicYearList from './components/academic_year/AcademicYearList';
import DepartmentList from './components/department/DepartmentList';
import Home from './components/home/Home';
import Header from './components/layout/Header';
import SpecializationList from './components/specialization/Specialization';
import TrainingSystemList from './components/training_system/TrainingSystemList';
import ClassList from './components/class/classList';
import UserList from './components/user/UserList';
import Login from './components/auth/Login';
import StudentList from './components/student/studentList';
import TeacherList from './components/teacher/teacherList';
import ProjectList from './components/project/projectList';
import DefenseSessionList from './components/defense_session/DefenseSessionList';
import TopicList from './components/topic/TopicList'; // Import component for topic management
import CouncilList from './components/council/CouncilList';

const App = () => {
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <Router>
       <h1 style={{ textAlign: 'center' }}>Quản lý đồ án tốt nghiệp</h1>
      <div className="container">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <div className="routes-container">
        <Routes>
          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/specializations" element={<SpecializationList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/training_systems" element={<TrainingSystemList />} />
              <Route path="/academic_years" element={<AcademicYearList />} />
              <Route path="/classes" element={<ClassList />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/defense_sessions" element={<DefenseSessionList />} />
              <Route path="/topics" element={<TopicList />} /> {/* Thêm tuyến đường cho quản lý đề tài */}
              <Route path="/councils" element={<CouncilList />} />

            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}

          {/* Login Route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
