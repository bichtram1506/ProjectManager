const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userController = {
  getAllUsers: (req, res) => {
    User.getAllUsers((error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  },

  registerUser: (req, res) => {
    const { name, password } = req.body;
    User.registerUser(name, password, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  },

  getUserByUsername: (name, callback) => {
    User.getUserByUsername(name, (error, user) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, user);
      }
    });
  },

  loginUser: (req, res) => {
    const { name, password } = req.body;
    User.getUserByUsername(name, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Sử dụng khóa bí mật thực sự thay cho 'your-secret-key'
        const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });

        res.json({ token });
      });
    });
  },
  updateUser: (req, res) => {
    const userId = req.params.id;
    const { name, password } = req.body;
    User.updateUser(userId, name, password, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  }
};

module.exports = userController;