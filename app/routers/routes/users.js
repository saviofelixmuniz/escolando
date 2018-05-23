/**
 * @author Sávio Muniz
 */
var express = require('express');
var usersRouter = express.Router();
var usersController = require('../../controllers/users');
var loggedInMW = require('../../middlewares/loggedIn');

usersRouter.post('/', usersController.registerUser);
usersRouter.get('/token/:token', usersController.getUserByToken);
usersRouter.post('/role/:role/:token', usersController.registerRoledUser);
usersRouter.get('/students', usersController.getStudents);

module.exports = usersRouter;
