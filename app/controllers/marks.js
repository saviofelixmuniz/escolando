const Marks = require('../models/marks');

module.exports = {
    getMappedMarks: getMappedMarks,
    commitMarks: commitMarks
};

function getMappedMarks(req, res) {
    var groupId = req.params.groupId;
    var subjectId = req.params.subjectId;

    Marks.find({group_id: groupId, subject_id: subjectId}).then(function (marks) {
        var result = {};

        for (var mark of marks) {
            if (!result[mark.student_id])
                result[mark.student_id] = {};

            result[mark.student_id][mark.activity_id] = {value: mark.value, _id: mark._id};
        }

        res.status(200).json(result);
    });
}

async function commitMarks(req, res) {
    var marks = req.body;
    var students = Object.keys(marks);

    for (var student of students) {
        var activities = Object.keys(marks[student]);
        for (var activity of activities) {
            var markId = marks[student][activity]._id;
            var value = marks[student][activity].value;
            await Marks.update({_id: markId}, {"$set": {value: value}})
        }
    }

    res.status(200).json({message: 'Commited sucessfully'});
}