/**
 * @author Sávio Muniz
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    subject_ids: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Subject"
    },
    admission_date: {
        type: Date,
        required: false
    },
    courses_enabled: {
        type: [Schema.Types.ObjectId],
        ref: 'Course',
        required: false
    }
}, {collection : 'teacher'});

module.exports = mongoose.model("Teacher", teacherSchema);