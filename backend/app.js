const express = require('express');
const app = express();

const specializationRoutes = require('./routes/specializationRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const trainingSystemRoutes = require('./routes/trainingSystemRoutes');
const academicYearRoutes = require('./routes/academicYearRoutes'); // Thêm tuyến đường cho academic_years
const classesRoutes = require('./routes/classRoutes');
const studentsRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(express.json());

// Tuyến đường cho chuyên ngành
app.use('/specializations', specializationRoutes);

// Tuyến đường cho phòng ban
app.use('/departments', departmentRoutes);

// Tuyến đường cho người dùng
app.use('/users', userRoutes);

// Tuyến đường cho xác thực
app.use('/', authRoutes);

// Tuyến đường cho hệ đào tạo
app.use('/training_systems', trainingSystemRoutes);

// Tuyến đường cho các năm học
app.use('/academic_years', academicYearRoutes);

// Tuyến đường cho lớp học
app.use('/classes', classesRoutes);

// Tuyến đường cho sinh viên
app.use('/students', studentsRoutes);

// Tuyến đường cho giảng viên
app.use('/teachers', teacherRoutes);

// Tuyến đường cho đồ án

app.use('/projects', projectRoutes);

// Cấu hình và tuyến đường khác của ứng dụng

module.exports = app;