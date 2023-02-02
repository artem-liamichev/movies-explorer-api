const express = require('express');

const userRoutes = express.Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validateUpdateUserInfoBody } = require('../validators');

userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', validateUpdateUserInfoBody, updateUserInfo);

module.exports = {
  userRoutes,
};
