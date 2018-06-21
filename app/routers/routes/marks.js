var express = require('express');
var marksRouter = express.Router();
var marksController = require('../../controllers/marks');


marksRouter.get('/groups/:groupId/subjects/:subjectId/marks', marksController.getMappedMarks);
marksRouter.put('/groups/:groupId/subjects/:subjectId/marks', marksController.commitMarks);

module.exports = marksRouter;