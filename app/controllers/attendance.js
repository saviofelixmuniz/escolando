const Attendance = require('../models/attendance');
const Formatter = require('../helpers/format');

async function registerAttendanceList(req, res) {
    let studentList = req.body.students;
    let date = req.body.date;
    for (let student of studentList) {
        if (await Attendance.findOne({'student_id': student.id, date: date})) {
            await Attendance.update({'student_id': student.id, date: date},
                                    {"$set": {attended: student.attended}});
        }
        else {
            await Attendance.create({
                'student_id': student.id,
                'group_id': req.params.groupId,
                'attended': student.attended,
                'date': date
            });
            console.log("na criacao");
            console.log(date);
        }
    }

    res.status(200).json({message: 'Commited sucessfully'});
}

module.exports = {
    registerAttendanceList : registerAttendanceList
};