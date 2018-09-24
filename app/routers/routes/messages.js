var express = require('express');
var messagesRouter = express.Router();
var messagesController = require('../../controllers/messages');
var loggedInMW = require('../../middlewares/loggedIn');

messagesRouter.post('/', loggedInMW.verifyJWToken);
messagesRouter.post('/', messagesController.sendMessage);
messagesRouter.get('/user/:id', loggedInMW.verifyJWToken);
messagesRouter.get('/user/:id', messagesController.getMessagesWithUser);
messagesRouter.get('/users', loggedInMW.verifyJWToken);
messagesRouter.get('/users', messagesController.getUsersMessaged);

module.exports = messagesRouter;