// routes.js
const express = require('express');
const router = express.Router();
const userController = require ('../controllers/UserController');
const createUser = require ('../controllers/createUser');

router.post('/loginUser', userController.loginUser);
router.post('/createUser', createUser.createUser);

module.exports = router;
