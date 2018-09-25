/**
 * @author Sávio Muniz
 */
var express = require('express');
var usersRouter = express.Router();
var usersController = require('../../controllers/users');
var loggedInMW = require('../../middlewares/loggedIn');

usersRouter.post('/', usersController.registerUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.get('/token/:token', usersController.getUserByToken);
usersRouter.post('/role/:role/:token', usersController.registerRoledUser);
usersRouter.get('/students', usersController.getStudents);
usersRouter.put('/:role/:id', usersController.updateRoleObj);
usersRouter.get('/students/parent/:parentId', usersController.getStudentByParent);
usersRouter.get('/parent/:parentId', usersController.getParentById);
usersRouter.get('/students/groups/:groupId', usersController.getStudentsByGroup);
usersRouter.get('/teacher/:teacherId', usersController.getTeacherById);
usersRouter.get('/search', usersController.getUsersByName);

module.exports = usersRouter;
