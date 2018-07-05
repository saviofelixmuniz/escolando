var express = require('express');
var attendanceRouter = express.Router();
var attendanceController = require('../../controllers/attendance');

attendanceRouter.post('/groups/:groupId/attendance', attendanceController.registerAttendanceList);

module.exports = attendanceRouter;