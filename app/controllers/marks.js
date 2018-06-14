const Marks = require('../models/marks');

module.exports = {
    getMappedMarks: getMappedMarks
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
